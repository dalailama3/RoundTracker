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
    if (image)
      self.images_hash = self.images_hash || {}
      hash_size = self.images_hash ? self.images_hash.size : 0
      str = "hole#{hash_size + 1}"
      self.images_hash[str] = image
    end
  end

  def par_for_the_course
    self.par_hash.values.map(&:to_i).inject(:+)
  end
end
