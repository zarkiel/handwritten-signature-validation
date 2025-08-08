class ApplicationController < ActionController::API
    before_action :initialize_settings

    include ApiHelper

    rescue_from Exception, with: :rescue_exception
    rescue_from StandardError, with: :rescue_error

    def get_photo(field)
        return url_for(field) if field.attached?
        '/img/profile-photos/1.png'
    end

    def url_blob(field)
        return url_for(field) if field.attached?
        ''
    end
end
