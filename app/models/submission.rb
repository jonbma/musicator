class Submission
  include Mongoid::Document
  field :author_id, type: Integer
  field :receiver_id, type: Integer
  field :name, type: String
  embeds_many :stack_items
  embedded_in :user
end
