from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/user/<username>', methods=['GET', 'POST'])
def show_user(username):
	return '%s' % username
