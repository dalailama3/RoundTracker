class User < ActiveRecord::Base
  after_initialize do
    ensure_session_token
  end
  validates :session_token, presence: true
  validates :email, presence: true, uniqueness: true
  validates :email, length: { minimum: 6, too_short: "must have at least %{count} characters" }
  validate :password_check_length

  has_many :rounds, dependent: :destroy
  has_many :courses, dependent: :destroy
  has_many :friendships
  has_many :friends, :through => :friendships

  def password_check_length
    if self.password_digest == nil
      errors[:base] << "Password must be at least 6 characters"
    end

  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def password=(password)

    if password.length >= 6
      self.password_digest = BCrypt::Password.create(password)
    end

  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    user.try(:is_password?, user_params[:password]) ? user : nil
  end

end
