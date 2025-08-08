class V1::CustomersController < ApplicationController
    before_action :check_session_token, :initializers

    def index
        records = Customer.with_attached_images.all
        items = records.map do |record|
            {**record.json, fullname: record.fullname, images: record.images.map{|image|
                blob = image.blob
                blob_data = blob.download
                base64_encoded_data = Base64.strict_encode64(blob_data)
                mime_type = blob.content_type
                "data:#{mime_type};base64,#{base64_encoded_data}"
            }}
        end

        ok(items)
	end

    def grid
		records = Customer.all
        GridHelper.filters(records, @params)
        items = records.map do |record|
            record.json
        end

        ok(items)
	end

    def show = ok({**@customer.json, images: @customer.images.map{|image| url_for(image)}})
    def create = save
	def update = save

	def destroy
		@customer.destroy
		ok(@customer.json)
	end

	private
	def initializers
		id = params[:id]
		@customer = id.blank? ? Customer.new : Customer.find(id)
	end

    def save
        @customer.attributes = {
            name: @params[:name],
            lastname1: @params[:lastname1],
            lastname2: @params[:lastname2],
            document_type_id: @params[:document_type][:id],
            document_number: @params[:document_number],
		}

        current_images = @customer.images.map {|image| url_for(image)}
        sent_images = params[:meta].permit!.to_h.map do |key, image|
            image[:file] if image[:type] == 'url'
        end.compact

        @customer.images.each do |image|
            url = url_for(image)
            image.purge if !sent_images.include?(url) && current_images.include?(url)
        end

        unless params[:meta].blank?
            params[:meta].each do |key, image|
                @customer.images.attach(image[:file]) if image[:type] == 'file'
            end
        end

        return validation_error(@customer) unless @customer.valid?
		ok(@customer.json) if @customer.save
    end

end
