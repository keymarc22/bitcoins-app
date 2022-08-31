Rails.application.routes.draw do

  root to: 'blockchains#index'
  resources :blockchains
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
end
