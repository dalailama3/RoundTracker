json.(@round, :score_hash, :score, :fairways_hash, :greens_hash, :putts_hash, :note, :course_id)
json.set! :date, @round.date.strftime("%B %d, %Y")
json.course @round.course, :name, :par_hash
