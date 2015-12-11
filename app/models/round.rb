class Round < ActiveRecord::Base
  belongs_to :user
  validates :date, :course_name, :score, :user, presence: true

  def differentials
    scores = self.score_hash.values
    pars = self.par_hash.values
    diffs = scores.zip(pars).map { |pair| pair[0].to_i - pair[1].to_i }
    diffs.map { |diff| diff >= 0 ? "+#{diff}" : diff }
  end
end
