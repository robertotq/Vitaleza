from flaskext.mysql import MySQL

def tryLogin(username, password, cursor):
	query = "SELECT * FROM Empleado WHERE Username = \"" + username + "\" AND Password = \"" + password + "\";"
	cursor.execute(query);
	result = cursor.fetchone();
	if(result == None):
		return "Invalid Login";
	resultJson = '{ "username":"' + result[3] + '", "Name": "' + result[1] + '", "LastName": "' + result[2] + '", "Type": "' + str(result[5]) + '", "ID": "' + str(result[0]) + '" }'
	return resultJson 
