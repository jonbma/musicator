class Submission
  include Mongoid::Document
  field :author_id, type: Integer
  field :receiver_id, type: Integer
end
