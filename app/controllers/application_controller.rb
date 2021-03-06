class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  protect_from_forgery with: :null_session,
     if: Proc.new { |c| c.request.format =~ %r{application/json} }

  helper_method :current_user, :logged_in?

  def current_user
    return nil if self.session[:session_token].nil?
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    current_user != nil
  end

  def require_login
    unless logged_in?
      flash[:errors] = "You must be logged in"
      redirect_to new_session_url
    end
  end


  def log_in!(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def log_out!
    current_user.session_token = nil
    self.session[:session_token] = nil
  end
end
