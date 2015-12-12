class Course < ActiveRecord::Base
  validates :name, :par_hash, presence: true
  has_many :rounds
end
