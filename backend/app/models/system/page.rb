class System::Page < ApplicationRecord
    enum :category, {
        administrative: 1,
        organizational_development: 2,
        system_settings: 98,
        navigation: 99
    }

    enum :subcategory, {
        nothing: 1,
        communications: 2,
        system_main_settings: 3
    }
end
