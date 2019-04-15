Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :create, :update]
      resources :players, only: :create
        # post '/api/v1/games', to: 'games#create_or_find_player'
      # resources :players, only: [:create]
      end
    end

  end
