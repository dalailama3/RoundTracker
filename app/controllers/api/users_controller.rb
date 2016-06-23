module Api
  class UsersController < ApiController
    def index
      @users = User.all
      render json: @users, only: [:id, :email]
    end

    def show
      @user = User.find(params[:id])
    end
  end
end
