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
    @user = User.find_by_email(params[:user][:email])

    random_password = Array.new(10).map { (65 + rand(58)).chr }.join
    @user.password = random_password

    if @user.save
      UserMailer.reset_password(@user.email, random_password).deliver_now

      redirect_to new_session_url
      flash[:notice] = "Email has been sent"
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
