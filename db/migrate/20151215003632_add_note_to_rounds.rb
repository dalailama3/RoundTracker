class AddNoteToRounds < ActiveRecord::Migration
  def change
    add_column :rounds, :note, :text
  end
end
