class AddImageColumnToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :image, :text
  end
end
