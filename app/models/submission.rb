class Submission
  include Mongoid::Document
  field :author_id, type: Moped::BSON::ObjectId
  field :receiver_id, type: Moped::BSON::ObjectId
end
