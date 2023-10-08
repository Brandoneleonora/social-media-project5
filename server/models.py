from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db



# Models go here
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    astrology_sign = db.Column(db.String)
    lifter = db.Column(db.String)
    color = db.Column(db.String)
    age = db.Column(db.Integer)

    @validates('first_name', 'last_name', 'username', 'password')
    def validate_empty(self, key, input):
        if input == '':
            raise ValueError("Need to put something")
        return input
    #Relationship here
    posts = db.relationship('Posts', backref='user')

class Posts(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    body = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    #Relationship Here
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
class Comments(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    body = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    #Relationships Here