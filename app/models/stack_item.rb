class StackItem
  include Mongoid::Document
  field :submission_id, type: Integer
  field :author_id, type: Integer
  field :comment, type: String
end
