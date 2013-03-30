class Submission
  include Mongoid::Document
  field :author_id, type: Moped::BSON::ObjectId
  field :reviewer_id, type: Moped::BSON::ObjectId
  field :name, type: String
  embeds_many :stack_items
  
end
