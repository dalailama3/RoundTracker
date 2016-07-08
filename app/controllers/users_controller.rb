class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      redirect_to "#rounds"
    else
      render :new
    end
  end

  def forgot_password
    render
  end

  def emailer

  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
