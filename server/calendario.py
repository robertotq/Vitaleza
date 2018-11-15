from flaskext.mysql import MySQL
import datetime
import time

def sigNutriologa(idNutriologa, cursor):
	query = "SELECT ID, Nombre, Apellidos FROM Empleado WHERE ID > " + idNutriologa + " AND Tipo = 1 ORDER BY ID ASC;"
	cursor.execute(query)
	result = cursor.fetchone();
	if result == None:
			return 'None'
	resultJson = '{ "ID": "' + str(result[0]) + '", "Nombre": "' + str(result[1]) + '", "Apellidos": "' + str(result[2]) +'"}'
	return resultJson;

def prevNutriologa(idNutriologa, cursor):
	query = "SELECT ID, Nombre, Apellidos FROM Empleado WHERE ID < " + idNutriologa + " AND Tipo = 1 ORDER BY ID DESC;"
	cursor.execute(query)
	result = cursor.fetchone();
	if result == None:
			return 'None'
	resultJson = '{ "ID": "' + str(result[0]) + '", "Nombre": "' + str(result[1]) + '", "Apellidos": "' + str(result[2]) +'"}'
	return resultJson;


def requestCitas(idNutriologa, semana, finSemana,  cursor):
	query = "SELECT c.ID, p.Nombre, p.Apellidos, c.FechaAgendada, c.Confirmada FROM Cita c JOIN Paciente p on c.PacienteID = p.ID WHERE c.NutriologaID = " + idNutriologa + " AND c.FechaAgendada BETWEEN \"" + semana + "\" AND \"" + finSemana +"\";"
	print(query);
	cursor.execute(query)
	result = cursor.fetchone()
	if result == None:
		return '[]';
	resultString = '['
	while result != None:
		resultString += '{ "ID": "' + str(result[0]) + '", "Nombre": "' + str(result[1]) + '", "Apellidos": "' + str(result[2]) +'", "FechaAgendada": "'+ str(result[3]) + '", "Confirmada": "' + str(result[4]) + '"},'
		result = cursor.fetchone()
	resultString = resultString[:-1] + ']'
	return resultString