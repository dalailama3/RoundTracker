class AddFairwaysHashToRounds < ActiveRecord::Migration
  def change
    enable_extension "hstore"
    add_column :rounds, :fairways_hash, :hstore
  end
end
