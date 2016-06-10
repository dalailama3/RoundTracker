class ChangeImageColumnInCourses < ActiveRecord::Migration
  def change
    change_column :courses, :image, 'bytea USING CAST(image AS bytea)'
  end
end
