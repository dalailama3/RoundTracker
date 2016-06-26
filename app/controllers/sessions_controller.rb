class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    user = User.find_by(email: params[:user][:email])

    if !user.nil?
      if log_in!
        redirect_to "#rounds"
      else
        flash.now[:danger] = "Invalid email/password combination"
        render :new
      end

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
