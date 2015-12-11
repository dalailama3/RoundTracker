class AddScoreHashToRounds < ActiveRecord::Migration
  def change
    enable_extension "hstore"
    add_column :rounds, :score_hash, :hstore
  end
end
