Musicator::Application.routes.draw do
  root to: 'pages#home'
  
  get "pages/contact"

  get "pages/help"

end
