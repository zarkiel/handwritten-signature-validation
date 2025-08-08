Rails.application.routes.draw do
    get "up" => "rails/health#show", as: :rails_health_check

    root "home#index"

    namespace :v1 do
        scope :auth do
            post :login, to: 'auth#login'
            post :select_role, to: 'auth#select_role'
        end

        scope :session do
            get :initial_state, to: "session#initial_state"
            get :organization_chart, to: "session#organization_chart"
        end

        resources :customers do
            post :grid, on: :collection
        end

        resources :workers do
            post :grid, on: :collection
        end


        resources :dictionaries do
            get ':_prefix/:id',action: :show, on: :collection
            put ':_prefix/:id',action: :update, on: :collection
            delete ':_prefix/:id',action: :destroy, on: :collection
            patch ':_prefix/:id',action: :update, on: :collection
            get ':_prefix', action: :index, on: :collection
            post ':_prefix',action: :create, on: :collection

            post ':_prefix/grid/', on: :collection, action: :grid
        end

        scope :test, controller: :test do
            get 'organization_chart'
        end
    end

end
