class AddGreensHashToRounds < ActiveRecord::Migration
  def change
    enable_extension "hstore"
    add_column :rounds, :greens_hash, :hstore
  end
end
