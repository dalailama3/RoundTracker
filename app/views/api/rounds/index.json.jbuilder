json.array! @rounds do |round|
  json.(round, :id, :course_id, :score, :score_hash, :user_id, :note, :putts_hash, :fairways_hash, :greens_hash)
  json.set! :date, round.date.strftime("%B %d, %Y")
  json.course round.course
end
