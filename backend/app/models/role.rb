class Role < ApplicationRecord

    has_many :system_page_permissions, class_name: 'System::PagePermission', foreign_key: :role_id
    has_many :system_pages, through: :system_page_permissions

    def json = {
        id: id,
        name: name
    }

    def get_pages_operations
        system_page_permissions.includes!(:system_page).where("operations > 0").map do |permission|
            {
                name: permission.system_page.name,
                category: permission.system_page.category,
                subcategory: permission.system_page.subcategory,
                operations: permission.system_page.operations.split("\n").filter { |operation|
                    chunks = operation.strip.split('::')
                    (permission.operations.gsub(/\n|\r/, '').to_i(2) & (1 << chunks[1].to_i)) != 0
                }.map { |operation|
                    operation.strip.split('::')[0]
                }
            }
        end
    end
end
