class StackItem
  include Mongoid::Document
  field :comment, type: String
  embedded_in :submission

end
