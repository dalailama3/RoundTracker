RoundTracker::Application.routes.draw do

  root to: 'static_pages#root'
  resources :users, only: [:new, :create]
  resources :friendships, only: [:create, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :rounds, except: [:new]
    resources :courses
  end
end
