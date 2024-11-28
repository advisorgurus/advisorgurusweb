from flask import Blueprint, request, jsonify
from models import User, Booking, db
from utils.encryption import encrypt_password, check_encrypted_password
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

bp = Blueprint('auth', __name__)

@bp.route('/create-account', methods=['POST'])
def create_account():
    """
    Create a new user account
    """
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    new_user = User(
        first_name=data['firstName'],
        last_name=data['lastName'],
        email=data['email'],
        phone=data.get('phone')
    )
    new_user.set_password(data['password'])  # Encrypt the password
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Account created successfully!"}), 201

@bp.route('/login', methods=['POST'])
def login():
    """
    User login and token generation
    """
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and check_encrypted_password(user.password, data['password']):
        access_token = create_access_token(identity=user.email)
        return jsonify({"token": access_token}), 200

    return jsonify({"error": "Invalid email or password"}), 401

@bp.route('/user/bookings', methods=['GET'])
@jwt_required()
def get_user_bookings():
    """
    Retrieve bookings for the authenticated user
    """
    user_email = get_jwt_identity()  # Get the current user's email from the JWT
    user = User.query.filter_by(email=user_email).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Fetch bookings associated with the user
    bookings = Booking.query.filter_by(user_id=user.id).all()
    
    # Format booking data to return only required fields
    booking_data = [
        {
            "consultantName": booking.consultant_name,
            "meetingLink": booking.meeting_link,
            "date": booking.date.strftime('%Y-%m-%d'),
            "time": booking.time.strftime('%H:%M')
        }
        for booking in bookings
    ]
    
    return jsonify({"bookings": booking_data}), 200

@bp.route('/user/update-password', methods=['PUT'])
@jwt_required()
def update_password():
    """
    Update the password for the authenticated user
    """
    data = request.get_json()
    new_password = data.get('password')
    
    if not new_password:
        return jsonify({"error": "Password is required"}), 400
    
    user_email = get_jwt_identity()  # Get the current user's email from the JWT
    user = User.query.filter_by(email=user_email).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Encrypt and set the new password
    user.set_password(new_password)
    db.session.commit()
    
    return jsonify({"message": "Password updated successfully"}), 200
