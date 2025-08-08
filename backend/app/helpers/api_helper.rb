module ApiHelper

    SECRET_KEY = "530807575"
    JWT_ISSUER = "Zarkiel"
    CRYPT_KEY = '000102030405060708090a0b0c0d0e0f'
    CRYPT_IV = '101112131415161718191a1b1c1d1e1f'
    CRYPT_DATA = !Rails.env.development?

    def create_token(payload)
        payload[:iss] = JWT_ISSUER
        payload[:exp] = Time.now.to_i + 1 * 3600 if payload[:exp].nil? # 1 hora
        JWT.encode payload, SECRET_KEY, 'HS256'
    end

    def decrypt(payload)

        payload = Base64.strict_decode64(payload)
        decipher = OpenSSL::Cipher.new('aes-128-cbc')
        decipher.decrypt
        decipher.key = [CRYPT_KEY].pack("H*")
        decipher.iv = [CRYPT_IV].pack("H*")
        decipher.padding = 1
        decipher.update(payload) + decipher.final
    end

    def encrypt(payload)
        cipher = OpenSSL::Cipher.new('aes-128-cbc')
        cipher.encrypt
        cipher.key = [CRYPT_KEY].pack("H*")
        cipher.iv = [CRYPT_IV].pack("H*")
        cipher.padding = 1
        Base64.strict_encode64(cipher.update(payload) + cipher.final)
    end

    def decode_token(token)
        JWT.decode token, SECRET_KEY, true, { algorithm: 'HS256', iss: JWT_ISSUER, verify_iss: true}
    end

    def initialize_settings
        if !params[:data].blank? && CRYPT_DATA
            decrypted_params = JSON.parse(decrypt(params[:data])).with_indifferent_access
            @params = decrypted_params
        else
            @params = params[:data]
        end

        #@API_URL = Setting.get("api_url")&.value
        #@INTRANET_URL = Setting.get("intranet_url")&.value
    end

    def check_session_token
        token = request.headers["Authorization"]

        raise ApiException.new("Invalid Token", ApiException::FORBIDDEN) if token.blank?

        token = token.split(" ")[1]
        @payload, algorithm = decode_token(token)
        raise ApiException.new("Invalid Token", ApiException::FORBIDDEN) if @payload["sub"] != "Session"
        @User = User.includes(:worker).find(@payload["user_id"])
        @Role = @User.roles.find_by(name: @payload["role"])
    end



    private
    def rescue_exception(e)
        render json: {
            status: "ERROR",
            name: e.class,
            message: e.message,
            code: e.code,
            trace: Rails.env.development? ? e.backtrace : ""
        }, status: e.code
    end

    def rescue_error(e)
        render json: {
            status: "ERROR",
            name: e.class,
            message: e.message,
            code: 500,
            trace: Rails.env.development? ? e.backtrace : ""
        }, status: 500
    end

    def ok(data, meta = {})
        data = encrypt(JSON.generate(data)) if CRYPT_DATA
        #data = JSON.generate(data)
        render json: {
            status: "OK",
            data: data,
            meta: meta
        }
    end

    def validation_error(record)
        render json: {
            status: "VALIDATION_ERROR",
            errors: record.errors,
            code: 500
        }, status: 500
    end

    def error(message, code = 500)
        render json: {
            status: "ERROR",
            message: message,
            code: code
        }, status: code
    end

    def get_timestamp
        Time.now.strftime('%Y%m%d%H%M%S%L')
    end

    def get_sha1_token
        return Digest::SHA1.hexdigest((getTimeStamp*rand(1..99)).to_s);
    end

    def sha1(value)
        Digest::SHA1.hexdigest(value.to_s)
    end

    def temp_filedata(file)
        temp_name = "./tmp/storage/#{getSHA1Token}-#{file[:info][:name]}"
        File.open(temp_name, "wb") do |f|
            data = file[:data].split(",")
            f.write(Base64::decode64(data[1]))
            f.close
        end
        File.open(temp_name)
    end

    def move_uploaded_file(file, directory = 'public/archivos')
        extension = File.extname(file[:name].downcase).gsub(/\./, '')

        return nil if ["php", "phtml", "pht", "exe", "sh", "bat"].include? extension

        data = {
            real_name: file[:name],
            new_name: "#{getSHA1Token}.#{extension}"
        }

        file_data = Base64.decode64(file[:data].split(",")[1])

        File.open(Rails.root.join(directory, data[:new_name]), 'wb') do |file_io|
            file_io.write(file_data)
        end

        return data
    end

    def upload_file(file, allowed_extensions = [], directory = 'public/archivos')
        unless file.nil?
            extension = File.extname(file[:name].downcase).gsub(/\./, '')
            return nil if (!allowed_extensions.include?(extension) && allowed_extensions.length > 0)

            return move_uploaded_file(file, directory)
        end

        nil
    end

    def attach_base64(file, field)
        # Verifica si el string base64 incluye metadatos
        if file[:data].match?(/^data:([^;]+);base64,/)
            # Extraer la información de metadatos y el contenido
            metadata = file[:data].match(/^data:([^;]+);base64,/)[1]
            content = file[:data].gsub(/^data:([^;]+);base64,/, '')

            # Decodificar el contenido
            decoded_content = Base64.decode64(content)

            # Generar un nombre de archivo único
            filename = file[:info][:name]

            #raise ApiException.new('No se pudo subir el archivo') if ["php", "phtml", "pht", "exe", "sh", "bat"]

            # Crear un archivo temporal
            tempfile = Tempfile.new(filename)
            tempfile.binmode
            tempfile.write(decoded_content)
            tempfile.rewind

            # Adjuntar el archivo al modelo
            field.attach(
                io: tempfile,
                filename: filename,
                content_type: metadata
            )

            # Cerrar y eliminar el archivo temporal
            #tempfile.close
            #tempfile.unlink
        end
    end

    class ApiException < Exception
        UNAUTHORIZED = 401
        FORBIDDEN = 403
        NOT_FOUND = 404
        SERVER_ERROR = 500

        attr_reader :code

        def initialize(message, code = SERVER_ERROR)
            super(message)
            @code = code
        end

    end
end
