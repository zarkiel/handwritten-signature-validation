class System::PagePermission < ApplicationRecord
    belongs_to :system_page, class_name: 'System::Page', foreign_key: :system_page_id
    belongs_to :role, class_name: 'Role', foreign_key: :role_id
end
