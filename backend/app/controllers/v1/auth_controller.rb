class V1::AuthController < ApplicationController
    def login
        user = User.find_by("username = ? AND password = SHA1(?)", @params[:username], @params[:password])
        raise ApiException.new("Los datos ingresados son incorrectos.", ApiException::FORBIDDEN) if user.nil?
        raise ApiException.new("El usuario no está activo.") unless user.active?

        roles = user.roles
        raise ApiException.new("No tiene roles asignados o su rol no está habilitado") if (roles.nil? || roles.length == 0)

        if roles.length > 1
            payload = {
                sub: "RolePick",
                user_id: user.id,
                roles: roles.pluck(:name),
            }
            token = create_token(payload)
        else
            token = create_session_token(user.id, roles[0].name)
        end


        ok(token: token, roles: roles.pluck(:name))
    end

    private
    def create_session_token(user_id, role)

        payload = {
            sub: "Session",
            user_id: user_id,
            role: role,
            exp: Time.now.to_i + (365 * 24 * 3600)
        }
        create_token(payload)
    end
end