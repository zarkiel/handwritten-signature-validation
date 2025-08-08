class AddFk < ActiveRecord::Migration[8.0]
  def change
      add_foreign_key :workers, :dictionaries, type: :uuid, column: :document_type_id
      add_foreign_key :users, :workers, type: :uuid, column: :worker_id
      add_foreign_key :user_roles, :users, type: :uuid, column: :user_id
      add_foreign_key :user_roles, :roles, type: :uuid, column: :role_id
  end
end
