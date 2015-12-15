class RemoveFairwaysInRegulationFromRounds < ActiveRecord::Migration
  def change
    remove_column :rounds, :fairways_in_regulation
  end
end
