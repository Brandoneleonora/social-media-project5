# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from config import db

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)  # Initialize db
db.init_app(app)  # Initialize db with app

migrate = Migrate(app, db)  # Setup Migrate after db is initialized with app

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)
  # Correct import, make sure config.py is in the same directory.

# User Model
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    birthday = db.Column(db.String)
    astrology_sign = db.Column(db.String)
    # Uncomment below when the Posts class is available and not commented out.
    # posts = db.relationship("Posts", backref='users')

    def __repr__(self):
        return f'{self.username} was created!!!'