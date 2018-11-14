import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './Login.css';
import logo from '../Assets/logo.png';
import purple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';


const axios = require('axios');
const url = 'http://127.0.0.1:5000';

const theme = createMuiTheme({
	typography: {
    	useNextVariants: true,
  	},
	palette: {
		primary: purple,
		secondary: green,
		error: red
	}
});

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: ''
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  changeUsername(event){
    this.setState({username: event.target.value});
  }

  changePassword(event){
    this.setState({password: event.target.value})
  }

  logIn(event) {
    console.log('LoggedIn' + this.props.loggedIn);
    axios.get(`${url}/login`, {
	params: {
	  username: this.state.username,
	  password: this.state.password	
	}
	})
	.then((response) => {
		console.log(response)
		const resJson = response.data
		console.log(resJson)
		if (resJson === "Invalid Login") {
				//Show invalid login
				console.log("Can't log in!")
				this.setState({
					username: '',
					password: ''
				});
			}
		else {
			this.props.tryLogIn(resJson.ID, resJson.Name, resJson.LastName, resJson.Type)
			if (resJson.Type === "0") 
					this.props.history.push('/administrador')
			if (resJson.Type === "1") 
					this.props.history.push('/calendario')
			if (resJson.Type === "2") 
					this.props.history.push('/recepcionista')
		}

		})
	.catch((error) => {
		console.log(error);
	})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
   			<img src={logo} className="App-logo"alt="logo" />
   			<MuiThemeProvider theme={theme}>
	          	<Typography variant="h5" component="h3" className="Admin-bienvenido" color="primary">
	          		Vitaleza
	          	</Typography>
          	</MuiThemeProvider>
          	<div className="InputForm">
	            <form>
	              <TextField
	                id="username"
	                label="username"
	                className="TextFieldS"
	                margin="dense"
	                variant="filled"
	                onChange={this.changeUsername}
	                value={this.state.username}
	                color="inherit"
	                />
	            </form>

	            <form>
	              <TextField
	              id="password"
	              label="password"
	              className="TextFieldS"
	              InputProps={{
	                className: "TextFieldInput"
	              }}
	              type="password"
	              margin="dense"
	              variant="filled"
	              onChange={this.changePassword}
	              value={this.state.password}
	              />
	            </form>
	        </div>
	        <div>
	        	<MuiThemeProvider theme={theme}>
	            <Button variant="contained" color="primary" onClick={this.logIn} className="Login_Button">
	              Log In
	            </Button>
	            </MuiThemeProvider>
	        </div>
        </header>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

const mapDispatchtoProps = dispatch => {
  return {
      tryLogIn: (uId, userName, lastName, userType) => dispatch({type: 'LogIn', payload: {loggedIn: true, uId: uId, userName: userName, lastName: lastName, userType: userType}})
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Login));

