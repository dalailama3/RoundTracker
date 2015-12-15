class Round < ActiveRecord::Base
  belongs_to :user
  belongs_to :course
  validates :date, :course, :score, :user, :score_hash, presence: true
  validate :score_hash_must_contain_numbers

  def score_hash_must_contain_numbers
    self.score_hash.values.any? do |val|
      errors.add(:score_hash, "all scores must be numeric") if val.scan(/\A[+-]?\d+\Z/) == []
    end
  end

  def differentials
    scores = self.score_hash.values
    pars = self.course.par_hash.values
    diffs = scores.zip(pars).map { |pair| pair[0].to_i - pair[1].to_i }
    diffs.map { |diff| diff >= 0 ? "+#{diff}" : diff }
  end

  def total_putts
    if self.putts_hash
      self.putts_hash.values.map(&:to_i).inject(:+)
    end
  end

  def fairways
    if self.fairways_hash
      arr = self.fairways_hash.values.map { |v| 'x' if v == "Y" }
    end
    arr

  end

  def greens
    if self.greens_hash
      arr = self.greens_hash.values.map { |v| 'x' if v == "Y" }
    end
    arr
  end
end
