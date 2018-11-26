from flaskext.mysql import MySQL
import json

def getPacientesEmpezandoCon(Input, cursor):
	query = "SELECT * from Paciente WHERE (lower(CONCAT(Paciente.Nombre, \" \",Paciente.Apellidos)) LIKE '" + Input + "%');"
	cursor.execute(query);
	result = cursor.fetchone()
	if result == None:
		return '[]';
	resultString = '['
	while result != None:
		resultString += '{ "ID": "' + str(result[0]) + '", "Nombre": "' + str(result[1]) + '", "Apellidos": "' + str(result[2]) +'"},'
		result = cursor.fetchone()
	resultString = resultString[:-1] + ']'
	return resultString

def creaPaciente(Input, cursor):
	data = json.loads(Input)
	query = "INSERT INTO Paciente VALUES (0, \"" +  data["Nombre"] + "\", \"" + data["Apellidos"] + "\", \"" + data["Telefono"] + "\", \"" + data["Email"] + "\", \"" + data["FechaDeNacimiento"] + "\");"
	print(query);
	cursor.execute(query)
	return "Done"