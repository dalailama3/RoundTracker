class Course < ActiveRecord::Base
  validates :name, :par_hash, presence: true
  has_many :rounds
  validate :par_hash_must_contain_numbers

  def par_hash_must_contain_numbers
    self.par_hash.values.any? do |val|
      errors.add(:par_hash, "all values must be numeric") if val.scan(/\A[+-]?\d+\Z/) == []
    end
  end

  def image=(image)
    self.images_hash = {image: image}
  end

  def par_for_the_course
    self.par_hash.values.map(&:to_i).inject(:+)
  end
end
