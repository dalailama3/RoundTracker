class AddImagesHashToCourses < ActiveRecord::Migration
  def change
    enable_extension "hstore"
    add_column :courses, :images_hash, :hstore
  end
end
