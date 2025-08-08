class Dictionary < ApplicationRecord
    enum :collection, {
        no_collection: 0,
        genders: 1,
        banks: 2,
        bank_account_types: 3,
        marital_statuses: 4,
        worker_payment_methods: 5,
        countries: 6,
        document_types: 7,
        educational_situations: 8,
        educational_center_types: 9,
        blood_types: 10,
        worker_garments: 11
    }

    def json = {
        id: id,
        name: name,
        description: description
    }
end
