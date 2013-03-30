class StackItem
  include Mongoid::Document
  include Mongoid::Timestamps
  field :comment, type: String
  field :author_id, type: Moped::BSON::ObjectId
  embedded_in :submission
  embeds_many :comments
  embeds_many :highlights
end
