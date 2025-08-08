class V1::DictionariesController < ApplicationController
    before_action :check_session_token, :initializers

    def index
        records = Dictionary.where(collection: params[:_prefix]).order(position: :asc, name: :asc)
        items = records.map do |record|
            record.json
        end

        ok(items)
	end

    def grid

		records = Dictionary.where(collection: params[:_prefix])
        GridHelper.filters(records, @params)
        items = records.map do |record|
            record.json
        end

        ok(items)
	end

    def show = ok(@dictionary.json)
    def create = save
	def update = save

	def destroy
		@dictionary.destroy
		ok(@dictionary.json)
	end

	private
	def initializers
		id = params[:id]
		@dictionary = id.blank? ? Dictionary.new : Dictionary.find(id)
	end

    def save
        @dictionary.attributes = {
            name: @params[:name],
            description: @params[:description],
            collection: params[:_prefix]
		}

        return validation_error(@dictionary) unless @dictionary.valid?
		ok(@dictionary.json) if @dictionary.save
    end

end
