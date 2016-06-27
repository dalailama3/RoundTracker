json.array! @rounds do |round|
  json.(round, :id, :date, :course_id, :score, :score_hash, :user_id, :note, :putts_hash, :fairways_hash, :greens_hash)
  json.course round.course
end
