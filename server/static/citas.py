from flaskext.mysql import MySQL
import json
from datetime import datetime
from dateutil import tz
from_zone = tz.tzutc()
to_zone = tz.tzlocal()

def crearCitaInicial(DataJson, cursor):
	data = json.loads(DataJson)
	fecha = datetime.strptime(data["params"]["Fecha"], '%Y-%m-%dT%H:%M:%S.%fZ')
	fecha = fecha.replace(tzinfo=from_zone)
	fechaCentral = fecha.astimezone(to_zone)
	query = "INSERT INTO Cita(NutriologaID, PacienteID, Confirmada, FechaAgendada, Modalidad, Motivo, FormaDePago, TotalPago) values (" + str(data["params"]["NutriologaID"]) + "," + str(data["params"]["PacienteID"]) + ", false,'" + str(fechaCentral) + "'," + str(data["params"]["Modalidad"]) + ", \"" + str(data["params"]["Motivo"]) + "\"," + str(data["params"]["FormaDePago"]) + "," + str(data["params"]["TotalPago"]) + ");"
	cursor.execute(query);
	return "Done"


def cancelCita(CitaData, cursor):
	data = json.loads(CitaData)
	CitaID = data["CitaID"]
	query = "UPDATE Cita SET Cancelado = 1 WHERE ID = " + CitaID + ";"
	cursor.execute(query)
	return "Done"

def pagaCita(CitaData, cursor):
	data = json.loads(CitaData)
	CitaID = data["CitaID"]
	query = "UPDATE Cita SET Pagado = 1 WHERE ID = " + CitaID + ";"
	cursor.execute(query)
	return "Done"

def confirmaCita(CitaData, cursor):
	data = json.loads(CitaData)
	CitaID = data["CitaID"]
	query = "UPDATE Cita SET Confirmada = 1 WHERE ID = " + CitaID + ";"
	cursor.execute(query)
	return "Done"