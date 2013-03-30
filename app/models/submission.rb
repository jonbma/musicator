class Submission
  include Mongoid::Document
  field :author_id, type: Moped::BSON::ObjectId
  field :receiver_id, type: Moped::BSON::ObjectId
  field :name, type: String
  embeds_many :stack_items
  embedded_in :user
  
end
