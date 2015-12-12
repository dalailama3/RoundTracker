class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.date :date, null: false
      t.integer :course_id, null: false
      t.integer :score, null: false
      t.integer :total_putts
      t.float :greens_in_regulation
      t.float :fairways_in_regulation

      t.timestamps null: false
    end
  end
end
