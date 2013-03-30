class Chat
  include Mongoid::Document
  embedded_in :submission

end
