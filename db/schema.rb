# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160621182842) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "courses", force: :cascade do |t|
    t.string   "name",        null: false
    t.hstore   "par_hash",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.hstore   "images_hash"
    t.binary   "image"
    t.integer  "user_id",     null: false
  end

  create_table "friendships", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "friend_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "friendships", ["user_id", "friend_id"], name: "index_friendships_on_user_id_and_friend_id", unique: true, using: :btree

  create_table "rounds", force: :cascade do |t|
    t.date     "date",          null: false
    t.integer  "course_id",     null: false
    t.integer  "score",         null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.hstore   "score_hash"
    t.integer  "user_id",       null: false
    t.text     "note"
    t.hstore   "putts_hash"
    t.hstore   "greens_hash"
    t.hstore   "fairways_hash"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "username"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
