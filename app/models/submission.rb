class Submission
  include Mongoid::Document
  include Mongoid::Paperclip
  include Mongoid::Timestamps
  field :author_id, type: Moped::BSON::ObjectId
  field :reviewer_id, type: Moped::BSON::ObjectId
  field :name, type: String
  field :datetime, type: DateTime
  embeds_many :stack_items
  embeds_one :chat, autobuild: true
  has_mongoid_attached_file :score
	attr_accessible :reviewer_tokens
	attr_reader :reviewer_tokens

	def reviewer_tokens=(ids)
    self.reviewer_id = User.first.id
  end 


end
