class User < ActiveRecord::Base
  after_initialize do
    ensure_session_token
  end
  validates :email, length: { minimum: 6, too_short: "must have at least %{count} characters" }
  validate :password_check_length

  has_many :rounds
  has_many :courses
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

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

end
