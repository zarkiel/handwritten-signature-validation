class System::ResourcePermission < ApplicationRecord
    belongs_to :system_resource, class_name: 'System::Resource', foreign_key: :system_resource_id
    belongs_to :role, class_name: 'Role', foreign_key: :role_id
end
