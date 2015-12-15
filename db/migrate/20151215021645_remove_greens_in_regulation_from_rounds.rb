class RemoveGreensInRegulationFromRounds < ActiveRecord::Migration
  def change
    remove_column :rounds, :greens_in_regulation
  end
end
