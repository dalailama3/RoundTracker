class AddCourseParToRounds < ActiveRecord::Migration
  def change
    add_column :rounds, :course_par, :integer
  end
end
