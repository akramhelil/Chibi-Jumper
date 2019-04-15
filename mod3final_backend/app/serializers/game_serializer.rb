class GameSerializer < ActiveModel::Serializer
  attributes :id, :timer

  belongs_to :player
end
