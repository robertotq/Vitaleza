from flaskext.mysql import MySQL
import json

def creaEmpleado(Input, cursor):
	data = json.loads(Input)
	query = "INSERT INTO Empleado VALUES (0, \"" + data["Nombre"] + "\", \"" + data["Apellidos"] + "\", \"" + data["Username"] + "\", \"" + data["Password"] + "\", " + str(data["Tipo"]) + ");"
	cursor.execute(query);
	return "Done"

def getReporte(startDay, endDay, NutriologaID, cursor):
	results = '{'
	results += '"cancelaciones": ' + getCancelaciones(startDay, endDay, NutriologaID, cursor) + ','
	results += '"pacientes": ' + getTotalPacientes(startDay, endDay, NutriologaID, cursor) + ','
	results += '"modalidad": ' + getTotalPacientesPorModalidad(startDay, endDay, NutriologaID, cursor) + ','
	results += '"totalPago": ' + getTotalDinero(startDay, endDay, NutriologaID, cursor)
	results += '}'
	print results
	return results

def getCancelaciones(startDay, endDay, NutriologaID, cursor):
	query = "SELECT COUNT(ID), DATE(FechaAgendada) as Fecha From Cita WHERE NutriologaID = " + NutriologaID + " AND Cancelado = 1 AND FechaAgendada BETWEEN \"" + startDay + "\" AND \"" + endDay +"\" GROUP BY Fecha;"
	cursor.execute(query);
	result = cursor.fetchone()
	if result == None:
		return '[]';
	resultString = '['
	while result != None:
		resultString += '{ "Count": "' + str(result[0]) + '", "Date": "' + str(result[1]) + '"},'
		result = cursor.fetchone()
	resultString = resultString[:-1] + ']'
	return resultString

def getTotalPacientes(startDay, endDay, NutriologaID, cursor):
	query = "SELECT COUNT(ID), DATE(FechaAgendada) as Fecha From Cita WHERE NutriologaID = " + NutriologaID + " AND Cancelado = 0 AND FechaAgendada BETWEEN \"" + startDay + "\" AND \"" + endDay +"\" GROUP BY Fecha;"
	cursor.execute(query);
	result = cursor.fetchone()
	if result == None:
		return '[]';
	resultString = '['
	while result != None:
		resultString += '{ "Count": "' + str(result[0]) + '", "Date": "' + str(result[1]) + '"},'
		result = cursor.fetchone()
	resultString = resultString[:-1] + ']'
	return resultString

def getTotalPacientesPorModalidad(startDay, endDay, NutriologaID, cursor):
	query = "SELECT COUNT(ID), DATE(FechaAgendada)as Fecha, Modalidad From Cita WHERE NutriologaID = " + NutriologaID + " AND Cancelado = 0 AND FechaAgendada BETWEEN \"" + startDay + "\" AND \"" + endDay +"\" GROUP BY Modalidad, Fecha;"
	cursor.execute(query);
	result = cursor.fetchone()
	if result == None:
		return '[]';
	resultString = '['
	while result != None:
		resultString += '{ "Count": "' + str(result[0]) + '", "Date": "' + str(result[1]) + '", "Modalidad": "' + str(result[2]) + '"},'
		result = cursor.fetchone()
	resultString = resultString[:-1] + ']'
	return resultString

def getTotalDinero(startDay, endDay, NutriologaID, cursor):
	query = "SELECT SUM(TotalPago), DATE(FechaAgendada) as Fecha From Cita WHERE NutriologaID = " + NutriologaID + " AND Cancelado = 0 AND FechaAgendada BETWEEN \"" + startDay + "\" AND \"" + endDay +"\" GROUP BY Fecha;"
	cursor.execute(query);
	result = cursor.fetchone()
	if result == None:
		return '[]';
	resultString = '['
	while result != None:
		resultString += '{ "Count": "' + str(result[0]) + '", "Date": "' + str(result[1]) + '"},'
		result = cursor.fetchone()
	resultString = resultString[:-1] + ']'
	return resultString
