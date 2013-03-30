class StackItem
  include Mongoid::Document
  include Mongoid::Paperclip
  include Mongoid::Timestamps
  field :comment, type: String
  field :author_id, type: Moped::BSON::ObjectId
  has_mongoid_attached_file :audio
  embedded_in :submission
  embeds_many :comments
  embeds_many :highlights
end
