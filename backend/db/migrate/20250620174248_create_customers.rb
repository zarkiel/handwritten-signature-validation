class CreateCustomers < ActiveRecord::Migration[8.0]
  def change
    create_table :customers, id: :uuid do |t|
      t.timestamps
      t.string :name, null: false, default: "", limit: 500
      t.string :lastname1, null: false, default: "", limit: 500
      t.string :lastname2, null: false, default: "", limit: 500
      t.references :document_type, type: :uuid, null: false, foreign_key: {to_table: :dictionaries}
      t.string :document_number, null: false, default: "", limit: 500
    end
  end
end
