from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from db_config import db, init_db
from routes.auth import bp as auth_bp
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/*": {"origins": os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")}})

# Configure JWT Secret Key from environment variable
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "super-secret-key")
jwt = JWTManager(app)

# Initialize the database
init_db(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Register authentication blueprint
app.register_blueprint(auth_bp, url_prefix='/auth')

if __name__ == '__main__':
    app.run(debug=True)
