class RemoveTotalPuttsFromRounds < ActiveRecord::Migration
  def change
    remove_column :rounds, :total_putts
  end
end
