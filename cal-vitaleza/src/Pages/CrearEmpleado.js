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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Header from '../Components/Header';
import theme from '../Assets/Theme';
import './CrearEmpleado.css';

const axios = require('axios');
const url = 'http://35.243.146.191';

class CrearEmpleado extends Component {

	constructor(props){
		super(props);
		if(this.props.UserType === undefined || this.props.UserType === -1) {
			this.props.history.push('/');
		}
		this.state = {
			Nombre: '',
			Apellidos: '',
			Username: '',
			Password: '',
			Tipo: -1,
			displayError: []
		}
	}

	crearEmpleado = () => {
		var errors = [];
  		if(this.state.Nombre === ''){
  			errors.push("Introdusca el nombre del Empleado");
  		}
  		if(this.state.Apellidos === '')
  		{
  			errors.push("Introdusca los apellidos del Empleado");
  		}
  		if(this.state.Username === ''){
  			errors.push("Introdusca un nombre de usuario para el Empleado");
  		}
  		if(this.state.Password === ''){
  			errors.push("Introdusca una contraseña para el Empleado");
  		}
  		if(this.state.Tipo === -1){
  			errors.push("Introdusca un tipo de Empleado");
  		}
  		this.setState({
  				displayError: errors
  			})
  		if(errors.length == 0){
  			axios.post(`${url}/crearEmpleado`, {
  				Nombre: this.state.Nombre,
  				Apellidos: this.state.Apellidos,
  				Username: this.state.Username,
  				Password: this.state.Password,
  				Tipo: this.state.Tipo
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

  	handleChangeSelect = (event) => {
  		this.setState({
  			[event.target.name]: event.target.value
  		})
  	}

	displayError = () => {
  		if(this.state.displayError.length == 0){
  			return;
  		}
  		const output = this.state.displayError.map((error) =>   <Typography key={error} variant="body1" component="h3" color="default"> 
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
				<Header> Nuevo Empleado </Header>
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
										Datos del Empleado
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
					            <TextField
					                id="Username"
					                label="Nombre de Usuario"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={(input) => {this.setState({ Username: input.target.value })}}
					                fullWidth
					                value={this.state.Username}
					                color="primary"
					            />
					            <TextField
					                id="Password"
					                label="Contraseña"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={(input) => {this.setState({ Password: input.target.value })}}
					                fullWidth
					                value={this.state.Password}
					                color="primary"
					            />
					            <div className="InnerPageFields">
						            <FormControl className="Selects">
							          <InputLabel htmlFor="Tipo">Tipo de Empleado</InputLabel>
							          <Select
							            value={this.state.Tipo}
							            onChange={this.handleChangeSelect}
							            inputProps={{
							              name: 'Tipo',
							              id: 'Tipo',
							            }}
							          >
							            <MenuItem value={0}>
							              <em>Administrador</em>
							            </MenuItem>
							            <MenuItem value={1}>Nutriologa</MenuItem>
							            <MenuItem value={2}>Recepcionista</MenuItem>
							          </Select>
									</FormControl>
								</div>
					            <div className="InnerPaperDivider">
										<Divider />
										<Divider />
								</div>
								<Button variant="contained" color="primary" onClick={this.crearEmpleado}>
							             Inscribir Empleado
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

export default connect(mapStateToProps)(withRouter(CrearEmpleado));