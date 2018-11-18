import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import Header from '../Components/Header';
import theme from '../Assets/Theme';
import './CrearCita.css';
const axios = require('axios');
const url = 'http://127.0.0.1:5000';
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric'};

class CrearCita extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			pacienteNombre: '',
			paciente: null,
			pacientes: [],
			motivo: '',
			modalidad: -1,
			totalPago: 0,
			formaDePago: -1,
			displayError: []
		}
	}

	componentDidMount(){
		console.log(this.props.Fecha);
		if(this.props.NutriologaID == -1 || this.props.NutriologaID == undefined)
  			this.props.history.goBack();
		console.log('test');
	}

	handleInputChange = (newValue: string) => {
		this.setState({ pacienteNombre: newValue });
		return newValue;
  	};

  	handleChange = (selectedOption) => {
    this.setState({ paciente: selectedOption });
    console.log(`Option selected:`, selectedOption);
  	}

  	goBack = () => {
  		this.props.history.goBack();
  	}

  	printFecha = () => {
  		if(this.props.Fecha == undefined)
  			return;
  		return (this.props.Fecha).toLocaleString("es-mx", options)
  								 .split(' ')
							     .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
							     .join(' ');
  	}

  	setMotivo = (event) => {
  		this.setState({
  			motivo: event.target.value
  		});
  	}

  	handleChangeSelect = (event) => {
  		this.setState({
  			[event.target.name]: event.target.value
  		})
  	}

  	handleChangePago = (event) => {
  		if(isFinite(event.target.value)){
  			this.setState({
  				totalPago: event.target.value
  			})
  		}
  	}

  	crearCita = () => {
  		var errors = [];
  		if(this.state.paciente == null){
  			errors.push("Seleccione un paciente");
  		}
  		if(this.state.totalPago <= 0)
  		{
  			errors.push("Introdusca una cantidad valida a pagar");
  		}
  		if(this.state.modalidad == -1){
  			errors.push("Seleccione una modalidad");
  		}
  		if(this.state.formaDePago == -1){
  			errors.push("Seleccione una forma de pago");
  		}
  		this.setState({
  				displayError: errors
  			})
  		if(errors.length == 0){
  			axios.post(`${url}/crearCita`, {
  				params: {
  					PacienteID: this.state.paciente.value,
  					NutriologaID: this.props.NutriologaID,
  					Fecha: this.props.Fecha,
  					TotalPago: this.state.totalPago,
  					Modalidad: this.state.modalidad,
  					FormaDePago: this.state.formaDePago,
  					Motivo: this.state.motivo
  				}
  			})
  			.then((response) => {
  				if(response.data === "Done"){
  					this.goBack();
  				}
  				else
  				{
  					console.log("error");
  				}
  			})
  			.catch((error) => {
  				console.log(error);
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

  	crearPaciente = () => {
  		this.props.history.push('/crearPaciente');
  	}

	render(){
		const getOptions = (input) => {
			if(input === '')
				return [];
			return axios.get(`${url}/getPacientes`, {
				params: {
					Input: this.state.pacienteNombre
				}
			})
			.then((response) => {
				return response.data.map( paciente => ({ value: String(paciente.ID), label: paciente.Nombre + ' ' +  paciente.Apellidos}))
			})
		}

		return(
			<div>
				<Header> Crear Cita </Header>
				<div>
					<MuiThemeProvider theme={theme}>
						<div className="ReturnButton">
							<IconButton color="primary" onClick={this.goBack}>
			       					 <ArrowBack />
			     			</IconButton>
		     			</div>
		     			<div className="CitaPaper">
			     			<Paper className="CitaPaperInner">
			     				<Typography variant="h5" component="h3" color="primary">
										Agendar Cita
								</Typography>
								<div className="InnerPaperDivider">
										<Divider />
										<Divider />
								</div>
								<Typography variant="h6" component="h3" color="primary">
										Nombre del Paciente
								</Typography>
								<Grid container className="PacienteSelect">
									<Grid item xs={11} className="InnerSelects">
									<AsyncSelect
										value={ this.state.paciente }
										cacheOptions
							          	loadOptions={getOptions}
							          	onInputChange={this.handleInputChange}
							          	onChange={this.handleChange}
				        			/>
				        			</Grid >
				        			<Grid item xs={1} className="InnerSelects">
				        			<Button variant="contained" color="primary" onClick={this.crearPaciente}>
								              +
								    </Button>
								    </Grid>
							    </Grid>
			        			<div className="InnerPaperDivider">
										<Divider />
										<Divider />
								</div>
			        			<Typography variant="h6" component="h3" color="primary"> 
										{this.printFecha()}
								</Typography>
								<Typography variant="h6" component="h3" color="primary"> 
										Nutriologa: {this.props.NutriologaNombre}
								</Typography>
								<TextField
					                id="Motivo"
					                label="Motivo"
					                className="TextFieldS"
					                margin="dense"
					                variant="outlined"
					                onChange={this.setMotivo}
					                fullWidth
					                multiline={true}
					                rows={3}
					                value={this.state.motivo}
					                color="primary"
					            />
					            <div>
					            	<div className="InnerPageFields">
							            <FormControl>
								          <InputLabel htmlFor="modalidad">Modalidad</InputLabel>
								          <Select
								            value={this.state.modalidad}
								            onChange={this.handleChangeSelect}
								            inputProps={{
								              name: 'modalidad',
								              id: 'modalidad',
								            }}
								          >
								            <MenuItem value={0}>
								              <em>Presencial</em>
								            </MenuItem>
								            <MenuItem value={1}>En Linea</MenuItem>
								          </Select>
								        </FormControl>
							        </div>
							        <div className="InnerPageFields">
								        <FormControl className="Selects">
								          <InputLabel htmlFor="formaDePago">Forma De Pago</InputLabel>
								          <Select
								            value={this.state.formaDePago}
								            onChange={this.handleChangeSelect}
								            inputProps={{
								              name: 'formaDePago',
								              id: 'formaDePago',
								            }}
								          >
								            <MenuItem value={0}>
								              <em>Efectivo</em>
								            </MenuItem>
								            <MenuItem value={1}>Cheque</MenuItem>
								            <MenuItem value={2}>Tarjeta</MenuItem>
								            <MenuItem value={3}>Transferencia</MenuItem>
								          </Select>
								        </FormControl>
							        </div>
							        <div className="InnerPageFields">
							        <FormControl fullWidth>
								          <InputLabel htmlFor="totalPago">Costo de Cita</InputLabel>
								          <Input
								            id="totalPago"
								            variant="outlined"
								            value={this.state.totalPago}
								            onChange={this.handleChangePago}
								            startAdornment={<InputAdornment position="start">$</InputAdornment>}
								          />
								        </FormControl>
							        </div>
							    </div>
							    <div InnerPageFields>
								    <Button variant="contained" color="primary" onClick={this.crearCita}>
							              Agendar Cita
							            </Button>
						        </div>
						        {this.displayError()}
		        			</Paper>
	        			</div>
        			</MuiThemeProvider>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => {
  return {
  	NutriologaID: state.citaReducer.NutriologaID,
  	Fecha: state.citaReducer.Fecha,
  	NutriologaNombre: state.citaReducer.NutriologaNombre
  };
};

const mapDispatchtoProps = dispatch => {
  return {
      };
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(CrearCita));