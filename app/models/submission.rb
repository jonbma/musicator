class Submission
  include Mongoid::Document
  include Mongoid::Timestamps
  field :author_id, type: Moped::BSON::ObjectId
  field :reviewer_id, type: Moped::BSON::ObjectId
  field :name, type: String
  field :datetime, type: DateTime
  embeds_many :stack_items


end
