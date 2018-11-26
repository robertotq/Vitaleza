from flask import Flask, request
from flask_cors import CORS
from flaskext.mysql import MySQL
from login import tryLogin
from calendario import sigNutriologa, prevNutriologa, requestCitas, detallesCita
from pacientes import getPacientesEmpezandoCon, creaPaciente
from citas import crearCitaInicial, cancelCita, pagaCita, confirmaCita
from admin import creaEmpleado, getReporte
app = Flask(__name__)
mysql = MySQL(app)
CORS(app)

if __name__ == '__main__':
	app.run(host='0.0.0.0', post=80)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'A243xRuyWV34ddeR13f'
app.config['MYSQL_DATABASE_DB'] = 'VitalezaCalendario'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_PORT'] = 3306
mysql.init_app(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/login', methods=['GET'])
def trylogin():
	username = request.args.get('username', None)
	password = request.args.get('password', None)
	conn = mysql.connect()
	cursor = conn.cursor()
	result =  tryLogin(username, password, cursor)
	cursor.close()
	conn.close()
	return result;


@app.route('/siguienteNutriologa', methods=['GET'])
def siguienteNutriologa(): 
	idNutriologa = request.args.get('NutriologaID', None)
	conn = mysql.connect()
	cursor = conn.cursor()
	result =  sigNutriologa(idNutriologa, cursor)
	cursor.close()
	conn.close()
	return result;

@app.route('/previousNutriologa', methods=['GET'])
def previousNutriologa():
	idNutriologa = request.args.get('NutriologaID', None)
	conn = mysql.connect()
	cursor = conn.cursor()
	result = prevNutriologa(idNutriologa, cursor)
	cursor.close()
	conn.close()
	return result;

@app.route('/getCitas', methods=['GET'])
def getCitas():
	NutriologaID = request.args.get('NutriologaID', None)
	semana = request.args.get('semana', None)
	finSemana = request.args.get('finSemana', None)
	conn = mysql.connect()
	cursor = conn.cursor()
	result = requestCitas(NutriologaID, semana, finSemana, cursor)
	cursor.close()
	conn.close()
	return result;

@app.route('/citaDetalles', methods=['GET'])
def getDetalleCita():
	CitaID = request.args.get('CitaID', -1)
	conn = mysql.connect()
	cursor = conn.cursor()
	result = detallesCita(CitaID, cursor)
	cursor.close()
	conn.close()
	return result;


@app.route('/getPacientes', methods=['GET'])
def getPacientes():
	Input = request.args.get('Input', None)
	conn = mysql.connect()
	cursor = conn.cursor()
	result = getPacientesEmpezandoCon(Input, cursor)
	cursor.close()
	conn.close()
	return result;


@app.route('/crearCita', methods=['POST'])
def crearCita():
	DataJson = request.data
	conn = mysql.connect()
	cursor = conn.cursor()
	result = crearCitaInicial(DataJson, cursor)	
	if result == "Done":
		conn.commit()
	cursor.close()
	conn.close()
	return result

@app.route('/cancelarCita', methods=['POST'])
def cancelarCita():
	conn = mysql.connect()
	cursor = conn.cursor()
	result = cancelCita(request.data, cursor)
	if result == "Done":
		conn.commit()
	cursor.close()
	conn.close()
	return result;

@app.route('/pagarCita', methods=['POST'])
def pagarCita():
	conn = mysql.connect()
	cursor = conn.cursor()
	result = pagaCita(request.data, cursor)
	if result == "Done":
		conn.commit()
	cursor.close()
	conn.close()
	return result;

@app.route('/confirmarCita', methods=['POST'])
def confirmarCita():
	conn = mysql.connect()
	cursor = conn.cursor()
	result = confirmaCita(request.data, cursor)
	if result == "Done":
		conn.commit()
	cursor.close()
	conn.close()
	return result;

@app.route('/crearPaciente', methods=['POST'])
def crearPaciente():
	conn = mysql.connect()
	cursor = conn.cursor()
	result = creaPaciente(request.data, cursor)
	if result == "Done":
		conn.commit()
	cursor.close()
	conn.close()
	return result

@app.route('/crearEmpleado', methods=['POST'])
def crearEmpleado():
	conn = mysql.connect()
	cursor = conn.cursor()
	result = creaEmpleado(request.data, cursor)
	if result == "Done":
		conn.commit()
	cursor.close()
	conn.close()
	return result

@app.route('/getReportes', methods=['GET'])
def getReportes():
	conn = mysql.connect()
	cursor = conn.cursor()
	startDay = request.args.get('startDay', None)
	endDay = request.args.get('endDay', None)
	NutriologaID = request.args.get('NutriologaID', None)
	result = getReporte(startDay, endDay, NutriologaID, cursor)
	cursor.close()
	conn.close()
	return result
