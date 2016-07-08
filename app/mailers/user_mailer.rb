class UserMailer < ApplicationMailer
  default from: 'notifications@roundtracker.io'

  def reset_password(email, password)
    @email = email
    @password = password

    mail(to: @email, subject: 'Reset Password')
  end
end
