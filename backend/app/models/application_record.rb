class ApplicationRecord < ActiveRecord::Base
    primary_abstract_class

    after_initialize :generate_uuid

    def generate_uuid
        self.id = SecureRandom.uuid if self.id.nil?
    end

end
