RoundTracker::Application.routes.draw do

  root to: 'static_pages#root'
  get '/users/forgot-password', to: 'users#forgot_password'
  post '/users/emailer', to: 'users#emailer'

  resources :users, only: [:index, :new, :create]
  resources :friendships, only: [:create, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :rounds
    resources :courses
    resources :users, only: [:index, :show]
  end
end
