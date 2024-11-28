from db_config import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    password = db.Column(db.String(200), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key to User
    consultant_name = db.Column(db.String(100), nullable=False)  # Consultant's name for the meeting
    meeting_link = db.Column(db.String(200), nullable=False)     # Link to the online meeting
    date = db.Column(db.Date, nullable=False)                    # Date of the meeting
    time = db.Column(db.Time, nullable=False)                    # Time of the meeting

    created_at = db.Column(db.DateTime, default=datetime.utcnow)