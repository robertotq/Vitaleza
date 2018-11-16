from flask import Flask, request
from flask_cors import CORS
from flaskext.mysql import MySQL
from login import tryLogin
from calendario import sigNutriologa, prevNutriologa, requestCitas, detallesCita
app = Flask(__name__)
mysql = MySQL(app)
CORS(app)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'A243xRuyWV34ddeR13f'
app.config['MYSQL_DATABASE_DB'] = 'VitalezaCalendario'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_PORT'] = 3306
mysql.init_app(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/user/<username>', methods=['GET', 'POST'])
def show_user(username):
	return '%s' % username

@app.route('/login', methods=['GET'])
def trylogin():
	username = request.args.get('username', None)
	password = request.args.get('password', None)
	conn = mysql.connect()
	cursor = conn.cursor()
	return tryLogin(username, password, cursor) 


@app.route('/siguienteNutriologa', methods=['GET'])
def siguienteNutriologa(): 
	idNutriologa = request.args.get('NutriologaID', None)
	conn = mysql.connect()
	cursor = conn.cursor()
	return sigNutriologa(idNutriologa, cursor)

@app.route('/previousNutriologa', methods=['GET'])
def previousNutriologa():
	idNutriologa = request.args.get('NutriologaID', None)
	conn = mysql.connect()
	cursor = conn.cursor()
	return prevNutriologa(idNutriologa, cursor)

@app.route('/getCitas', methods=['GET'])
def getCitas():
	NutriologaID = request.args.get('NutriologaID', None)
	semana = request.args.get('semana', None)
	finSemana = request.args.get('finSemana', None)
	conn = mysql.connect()
	cursor = conn.cursor()
	return requestCitas(NutriologaID, semana, finSemana, cursor)

@app.route('/citaDetalles', methods=['GET'])
def getDetalleCita():
	CitaID = request.args.get('CitaID', -1)
	conn = mysql.connect()
	cursor = conn.cursor()
	return detallesCita(CitaID, cursor)
