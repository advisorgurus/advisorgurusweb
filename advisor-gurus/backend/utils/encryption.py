from werkzeug.security import generate_password_hash, check_password_hash

def encrypt_password(password):
    return generate_password_hash(password)

def check_encrypted_password(stored_password, provided_password):
    return check_password_hash(stored_password, provided_password)
