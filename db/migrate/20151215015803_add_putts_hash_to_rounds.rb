class AddPuttsHashToRounds < ActiveRecord::Migration
  def change
    enable_extension "hstore"
    add_column :rounds, :putts_hash, :hstore
  end
end
