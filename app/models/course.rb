class Course < ActiveRecord::Base
  validates :name, :par_hash, presence: true
  has_many :rounds

  def par_for_the_course
    self.par_hash.values.map(&:to_i).inject(:+)
  end
end
