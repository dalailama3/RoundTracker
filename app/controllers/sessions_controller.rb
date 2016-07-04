class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user])

    if @user
      log_in!(@user)
      redirect_to "#rounds"
    else
      flash.now[:danger] = "Invalid email/password combination"
      render :new
    end
  end

  def destroy
    log_out!
    redirect_to new_session_url
  end
end
