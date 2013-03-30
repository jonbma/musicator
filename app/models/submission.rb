class Submission
  include Mongoid::Document
  include Mongoid::Timestamps
  field :author_id, type: Moped::BSON::ObjectId
  field :reviewer_id, type: Moped::BSON::ObjectId
  field :name, type: String
  field :datetime, type: DateTime
  embeds_many :stack_items
  embeds_one :chat, autobuild: true
	attr_accessible :reviewer_tokens
	attr_reader :reviewer_tokens

	def reviewer_tokens=(ids)
    self.reviewer_id = User.first.id
  end 

  validates_presence_of :name, :author_id, :reviewer_id

end
