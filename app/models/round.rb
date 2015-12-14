class Round < ActiveRecord::Base
  belongs_to :user
  belongs_to :course
  validates :date, :course, :score, :user, presence: true
  validate :score_hash_must_contain_numbers

  def score_hash_must_contain_numbers
    self.score_hash.values.each do |val|
      return false if val.scan(/\A[+-]?\d+\Z/) == []
    end

  end


  def differentials
    scores = self.score_hash.values
    pars = self.course.par_hash.values
    diffs = scores.zip(pars).map { |pair| pair[0].to_i - pair[1].to_i }
    diffs.map { |diff| diff >= 0 ? "+#{diff}" : diff }
  end
end
