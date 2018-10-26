Rails.application.routes.draw do

  authenticated :user do
    resources :posts, constraints: lambda { |req| req.format == :json }
    root 'app/dashboard#index'
    match "*path", to: 'app/dashboard#index', via: :get
  end

  devise_for :users

  root "pages#home"
end
