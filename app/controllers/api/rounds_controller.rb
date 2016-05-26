module Api
  class RoundsController < ApiController
    before_action :require_login
    def index
      @rounds = current_user.rounds

      render json: @rounds
    end

    def show
      @round = Round.find(params[:id])
      @diffs = @round.differentials

      render json: @round

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
      @round.putts_hash = putts_hash
      @round.greens_hash = greens_hash
      @round.fairways_hash = fairways_hash

      if @round.save
        # redirect_to round_url(@round)
        render json: @round
      else
        render json: @round.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @round = Round.find(params[:id])
      @round.destroy

      render json: {}
    end

    def edit
      @round = Round.find(params[:id])
      @courses = Course.all


    end

    def update
      @round = Round.find(params[:id])
      @round.score_hash = score_hash
      if @round.update_attributes(round_params)

        # redirect_to round_url(@round)
        render json: @round
      else
        render json: @round.errors.full_messages, status: :unprocessable_entity
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

    def putts_hash
      putts_hash = {}
      params[:round].each do |param, val|
        if param.start_with?("putts")
          putts_hash[param] = val
        end
      end
      putts_hash
    end

    def greens_hash
      greens_hash = {}
      params[:round].each do |param, val|
        if param.start_with?("greens")
          greens_hash[param] = val
        end
      end
      greens_hash
    end

    def fairways_hash
      fairways_hash = {}
      params[:round].each do |param, val|
        if param.start_with?("fairways")
          fairways_hash[param] = val
        end
      end
      fairways_hash
    end


  end
end