class User < ApplicationRecord

    has_many :user_roles, class_name: 'UserRole', foreign_key: 'user_id', dependent: :delete_all
    has_many :roles, through: :user_roles
    belongs_to :worker, class_name: 'Worker', foreign_key: 'worker_id'

    def active? = status & 1 == 1
end
