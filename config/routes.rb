Musicator::Application.routes.draw do
  root to: 'pages#home'

match '/help',    to: 'pages#help'
match '/contact', to: 'pages#contact'  
end
