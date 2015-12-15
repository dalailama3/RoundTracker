class RoundsController < ApplicationController
  before_action :require_login
  def index
    @rounds = Round.order(date: :desc)
  end

  def show
    @round = Round.find(params[:id])
    @diffs = @round.differentials

  end

  def new
    @round = Round.new
    @courses = Course.all

  end

  def create
    @courses = Course.all
    @round = Round.new(round_params)
    @round.user_id = current_user.id
    @round.score = total_score
    @round.score_hash = score_hash


    if @round.save
      redirect_to round_url(@round)
    else
      render :new
    end
  end

  def destroy
    @round = Round.find(params[:id])
    @round.destroy
    redirect_to rounds_url
  end

  def edit
    @round = Round.find(params[:id])
    @courses = Course.all


  end

  def update
    @round = Round.find(params[:id])
    @round.score_hash = score_hash
    if @round.update_attributes(round_params)

      redirect_to round_url(@round)
    else
      render :edit
    end
  end

  private
  def round_params
    params.require(:round).permit(:date, :course_id, :note)
  end

  def total_score
    result = 0
    params[:round].each do |param, val|
      result += val.to_i if param.start_with?("score")
    end
    result
  end

  def score_hash
    score_hash = {}
    params[:round].each do |param, val|
      if param.start_with?("score")
        score_hash[param] = val
      end
    end
    score_hash
  end
end
