class Customer < ApplicationRecord
    belongs_to :document_type, class_name: 'Dictionary', foreign_key: 'document_type_id'

    has_many_attached :images
    validates :images, content_type: [:png, :jpg, :jpeg, :jfif]

    def json = {
        id: id,
        name: name,
        lastname1: lastname1,
        lastname2: lastname2,
        document_type: document_type.json,
        document_number: document_number,
    }

    def fullname = "#{name} #{lastname1} #{lastname2}"
end
