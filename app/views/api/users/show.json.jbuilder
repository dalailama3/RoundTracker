json.(@user, :email, :id)
json.rounds @user.rounds, :id, :date, :score, :note, :score_hash, :fairways_hash, :greens_hash, :putts_hash, :course
