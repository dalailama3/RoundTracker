class AddParHashToRounds < ActiveRecord::Migration
  def change
    enable_extension "hstore"
    add_column :rounds, :par_hash, :hstore
  end
end
