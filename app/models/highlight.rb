class Highlight
  include Mongoid::Document
  field :x1, type: Float
  field :y1, type: Float
  field :x2, type: Float
  field :y2, type: Float
  field :pg, type: Integer
  field :color, type: Integer
  embedded_in :stack_item

end
