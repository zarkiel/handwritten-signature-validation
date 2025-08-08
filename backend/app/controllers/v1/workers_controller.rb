class V1::WorkersController < ApplicationController
    before_action :check_session_token, :initializers

    def index
        records = Worker.all
        items = records.map do |record|
            record.json
        end

        ok(items)
	end

    def grid
		records = Worker.with_attached_photo.includes(:document_type).all
        GridHelper.filters(records, @params)
        items = records.map do |record|
            {**record.json, photo: get_photo(record.photo)}
        end

        ok(items)
	end

    def show
        @worker = Worker.with_attached_photo.includes(:document_type).find(@id)

        ok({
               **@worker.json,
               photo: get_photo(@worker.photo)
           })
    end

    def create = save
	def update = save

	def destroy
		@worker.destroy
		ok(@worker.json)
	end

	private
	def initializers
        @id = params[:id]
		@worker = @id.blank? ? Worker.new : Worker.find(@id)
	end

    def save

        @worker.attributes = {
            name: @params[:name],
            lastname1: @params[:lastname1],
            lastname2: @params[:lastname2],
            document_type_id: @params[:document_type][:id],
            document_number: @params[:document_number],


		}

        #attach_base64(params[:meta][:photo], @worker.photo) unless params[:meta][:photo].blank?
        unless params[:meta].blank?
            @worker.photo.attach(params[:meta][:photo]) unless params[:meta][:photo].blank?
        end

        return validation_error(@worker) unless @worker.valid?
        if @worker.save
		    ok(@worker.json)
        end
    end

end
