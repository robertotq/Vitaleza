import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Header from '../Components/Header';
import theme from '../Assets/Theme';
import './CrearPaciente.css';

const axios = require('axios');
const url = 'http://35.243.146.191';

class CrearPaciente extends Component {

	constructor(props){
		super(props);
		if(this.props.UserType === undefined || this.props.UserType === -1) {
			this.props.history.push('/');
		}
		this.state = {
			Nombre: '',
			Apellidos: '',
			FechaDeNacimiento: '0000-00-00',
			Email: '',
			Telefono: '',
			displayError: []
		}
	}

	crearPaciente = () => {
		console.log("Test");
		var errors = [];
  		if(this.state.Nombre === ''){
  			errors.push("Introdusca el nombre del Paciente");
  		}
  		if(this.state.Apellidos === '')
  		{
  			errors.push("Introdusca los apellidos del Paciente");
  		}
  		if(this.state.FechaDeNacimiento === '0000-00-00'){
  			errors.push("Introdusca la fecha de nacimiento del Paciente");
  		}
  		if(this.state.Email === ''){
  			errors.push("Introdusca un email del Paciente");
  		}
  		if(this.state.Telefono === ''){
  			errors.push("Introdusca un telefono del Paciente");
  		}
  		this.setState({
  				displayError: errors
  			})
  		if(errors.length == 0){
  			axios.post(`${url}/crearPaciente`, {
  				Nombre: this.state.Nombre,
  				Apellidos: this.state.Apellidos,
  				FechaDeNacimiento: this.state.FechaDeNacimiento,
  				Email: this.state.Email,
  				Telefono: this.state.Telefono
  			})
  			.then((response) => {
  				if(response.data === "Done"){
  					this.goBack();
  				}
  			})
  			.catch((error) => {
  				console.log(error)
  			})
  		}
	}

	displayError = () => {
  		if(this.state.displayError.length == 0){
  			return;
  		}
  		const output = this.state.displayError.map((error) => <Typography key={error} variant="body1" component="h3" color="default"> 
																{error}
																</Typography>)
		const paperOutput = <div className="InnerPaperDivider"> <Paper className="InnerPaperDivider"> {output} </Paper> </div>;
		return paperOutput;
  	}

	goBack = () => {
  		this.props.history.goBack();
  	}
	render() {
		return (
			<div>
				<Header> Nuevo Paciente </Header>
				<div>
					<MuiThemeProvider theme={theme}>
						<div className="ReturnButton">
							<IconButton color="primary" onClick={this.goBack}>
			       					 <ArrowBack />
			     			</IconButton>
		     			</div>
		     			<div className="PacientePaper">
		     				<Paper className="PacientePaperInner"> 
		     					<Typography variant="h5" component="h3" color="primary">
										Datos del Paciente
								</Typography>
								<div className="InnerPaperDivider">
										<Divider />
										<Divider />
								</div>
								<TextField
					                id="Nombre"
					                label="Nombre"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={(input) => {this.setState({ Nombre: input.target.value })}}
					                fullWidth
					                value={this.state.Nombre}
					                color="primary"
					            />
					            <TextField
					                id="Apellidos"
					                label="Apellidos"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={(input) => {this.setState({ Apellidos: input.target.value })}}
					                fullWidth
					                value={this.state.Apellidos}
					                color="primary"
					            />
					            <form noValidate>
						            <TextField
						                id="FechaDeNacimiento"
						                label="Fecha de Nacimiento"
						                className="TextFieldS"
						                margin="dense"
						                variant="outlined"
						                type="date"
						                onChange={(input) => {this.setState({ FechaDeNacimiento: input.target.value })}}
						                fullWidth
						                value={this.state.FechaDeNacimiento}
						                color="primary"
						            />
					            </form>
					            <TextField
					                id="Email"
					                label="Email"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={(input) => {this.setState({ Email: input.target.value })}}
					                fullWidth
					                value={this.state.Email}
					                color="primary"
					            />
					            <TextField
					                id="Telefono"
					                label="Telefono"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={(input) => {this.setState({ Telefono: input.target.value })}}
					                fullWidth
					                value={this.state.Telefono}
					                color="primary"
					            />
					            <div className="InnerPaperDivider">
										<Divider />
										<Divider />
								</div>
								<Button variant="contained" color="primary" onClick={this.crearPaciente}>
							              Inscribir Paciente
							    </Button>
							 	{this.displayError()}
		     				</Paper>
		     			</div>
					</MuiThemeProvider>
				</div>
			</div>

		)
	}

}

const mapStateToProps = state => {
  return {
  	UserType: state.userReducer.userType
  };
};


export default connect(mapStateToProps)(withRouter(CrearPaciente));