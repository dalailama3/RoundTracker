module Api
  class UsersController < ApiController
    def index
      @users = User.all
      render json: @users, only: [:id, :email]
    end
  end
end
