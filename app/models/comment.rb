class Comment
  include Mongoid::Document
  field :x, type: Float
  field :y, type: Float
  field :content, type: String
end
