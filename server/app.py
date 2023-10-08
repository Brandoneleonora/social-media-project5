#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from decouple import config
from flask import request, make_response, jsonify, session
from flask_restful import Resource
# Local imports
from config import app, db, api, bcrypt
# Add your model imports
from models import User, Posts, Comments

app.secret_key = b'\xd5e\xc5M\x9fS\x81~U\xa8x\xc2\xec@r\x84'

# Views go here!

@app.before_request
def check_if_logged_in():
    print("hi")
    # if not session['user_id']:
    #     return jsonify({'error': 'Unauthorized'}), 401

@app.route('/signup', methods=['POST'])
def signUp():

    if request.method == 'POST':
        post_info = request.get_json()

        new_user = User(
            first_name=post_info['first_name'],
            last_name=post_info['last_name'],
            username=post_info['username'],
            password=bcrypt.generate_password_hash(post_info['password']),
        )

        db.session.add(new_user)
        db.session.commit()


        return jsonify(new_user.to_dict()), 200

#This is to log in all it should do is validate the information from the users input
@app.route('/login', methods=['POST'])
def logIn():
    if request.method == 'POST':
        log_in = request.get_json()
        if User.query.filter(User.username == log_in['username']).first():
            user = User.query.filter(User.username == log_in['username']).first()
        else:
            return jsonify({"error" : "Incorrect Credentials"}), 403
        if user.username == log_in['username'] and bcrypt.check_password_hash(user.password, log_in['password']):
            session.user_id = user.id
            print(session.user_id)
            return (jsonify(user.to_dict()), 200)
        else:
            return jsonify({"error" : "Incorrect Credentials"}), 403
    
@app.route('/check_session', methods=['GET'])
def check_sesh():
    user = User.query.filter(User.id == session.get("user_id")).first()
    if user:
        return jsonify(user.to_dict())
    else:
        return jsonify({'message': '401: Not Authorized'}), 401

#This is the main page and you should recieve everyones posts
@app.route('/home', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        all_posts = []
        for post in Posts.query.all():
            post_dict = {
                "id": post.id,
                "username": post.username,
                "body": post.body,
                "created_at": post.created_at,
                "updated_at": post.updated_at,
            }
            all_posts.append(post_dict)
        
        response = make_response(
            jsonify(all_posts),
            200
        )
        return response

    elif request.method == 'POST':
        posts_body = request.get_json()

        new_post = Posts(
            username = posts_body["username"],
            body = posts_body["body"],
        )

        db.session.add(new_post)
        db.session.commit()

        new_post_dict = new_post.to_dict()

        response = make_response(
            jsonify(new_post_dict),
            201
        )
        return response

#This is suppose to return the persons profile and you should be able to update it 
@app.route('/profile/<string:username>', methods=['GET', 'PATCH'])
def profile(username):
    user = User.query.filter(User.username == username).first()

    if request.method == 'GET':
        return (jsonify(user.to_dict()), 200)

    elif request.method == 'PATCH':
        data = request.get_json()
        for attr in data:
            setattr(user, attr, data[attr])

        db.session.add(user)
        db.session.commit()

        return jsonify(user.to_dict()), 200

#This shoudl return your all of your own post
@app.route('/posts/<string:username>', methods=['GET'])
def posts(username):

    if request.method == 'GET':
        my_posts = []
        for post in Posts.query.filter(Posts.username == username).all():
            my_dict = {
                "id": post.id,
                "username":post.username,
                "body": post.body,
                "created_at": post.created_at,
                "updated_at": post.updated_at,               
            }

            my_posts.append(my_dict)

        return jsonify(my_posts), 200



@app.route('/posts/<int:id>', methods=['DELETE', 'GET', 'PATCH'])
def single_posts(id):
    post = Posts.query.filter(Posts.id == id).first()
   

    if request.method == 'DELETE':
        db.session.delete(post)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "Message deleted."    
        }

        return response_body, 200

    elif request.method == 'GET':
        return(jsonify(post.to_dict()), 200)

    elif request.method == 'PATCH':
        data = request.get_json()
        for attr in data:
            setattr(post, attr, data[attr])

        db.session.add(post)
        db.session.commit()

        return jsonify(post.to_dict()), 200

if __name__ == '__main__':
    app.run(port=5555, debug=True)

