class RoundsController < ApplicationController
  def index
    @rounds = Round.order(date: :desc)
  end

  def show
    @round = Round.find(params[:id])
    @diffs = @round.differentials

  end

  def new
    @round = Round.new
    render :new
  end

  def create

    @round = Round.new(round_params)
    @round.user_id = current_user.id
    @round.score = total_score
    @round.course_par = par_for_the_course
    @round.par_hash = par_hash
    @round.score_hash = score_hash

    if @round.save
      redirect_to round_url(@round)
    else
      render :new
    end
  end

  def edit
    @round = Round.find(params[:id])
    if @round.update_attributes(round_params)
      render round_url(@round)
    else
      render :edit
    end
  end

  private
  def round_params
    params.require(:round).permit(:date, :course_name, :score)
  end

  def par_for_the_course
    result = 0

    params[:round].each do |param, val|
      result += val.to_i if param.start_with?("hole")
    end
    result
  end

  def total_score
    result = 0
    params[:round].each do |param, val|
      result += val.to_i if param.start_with?("score")
    end
    result
  end


    def par_hash
      par_hash = {}
      params[:round].each do |param, val|
        if param.start_with?("hole")
          par_hash[param] = val
        end
      end
      par_hash
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
