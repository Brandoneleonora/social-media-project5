#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from flask_migrate import Migrate  # Import Migrate

# Local imports
from config import app, db, api
from models import User  # Import your User model

migrate = Migrate(app, db)  # Initialize Migrate with app and db

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)