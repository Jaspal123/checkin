from flask import Flask,request,jsonify
from flask_cors import CORS
app=Flask(__name__)
CORS(app)
@app.route('/create', methods=["POST"])
def create():
    username = request.get_json()['name']
    password = request.get_json()['password']
    print(username)
    print(password)
    return jsonify({'name':username, 'password': password});
