Musicator::Application.routes.draw do
	devise_for :users

	root to: 'pages#home'

	match '/help',    to: 'pages#help'
	match '/contact', to: 'pages#contact'
	match '/reviewers', to: 'users#reviewers'


	resources :users, only: [:show]
	resources :submissions do
		resources :stack_items
		resources :chat
	end
end
