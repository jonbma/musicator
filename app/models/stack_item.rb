class StackItem
  include Mongoid::Document
  field :comment, type: String
  embedded_in :submission
  embeds_many :comments
  embeds_many :highlights
end
