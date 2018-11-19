import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { MuiThemeProvider } from '@material-ui/core/styles';


import Header from '../Components/Header';
import theme from '../Assets/Theme';
import './DetallesCita.css'
const axios = require('axios');
const url = 'http://127.0.0.1:5000';
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric'};

class DetallesCita extends Component {

	constructor(props) {
    super(props);
    if(this.props.UserType === undefined || this.props.UserType === -1) {
			this.props.history.push('/');
		}
    this.state = { info: '' };
  	}

  	componentDidMount(){
  		if(this.props.CitaID == -1)
  			this.props.history.goBack();
  		axios.get(`${url}/citaDetalles`, {
			params: {
			  CitaID: this.props.CitaID
			}
		})
		.then((response) => {
			this.setState({
				info: response.data
			});
		})
  	}

  	goBack = () => {
  		this.props.history.goBack();
  	}

  	getDateString = () => {
  		return new Date(this.state.info.FechaAgendada).toLocaleString('es-MX', options)
  													  .split(' ')
  													  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
  													  .join(' ')
  	}

  	displayDone = (info) => {
  		if(info == 0)
  			return <Clear color="primary"/>
  		else
  			return <Done color="primary"/>
  	}

  	cancelarCita = () => {
  		axios.post(`${url}/cancelarCita`, {
  			CitaID: this.props.CitaID
  		})
  		.then((response) => {
  			this.goBack();
  		})
  	}

  	pagarCita = () => {
  		axios.post(`${url}/pagarCita`, {
  			CitaID: this.props.CitaID
  		})
  		.then((response) => {
  			var newInfo = this.state.info;
  			newInfo.Pagado = 1;
  			this.setState({
  				info: newInfo
  			});
  		})
  	}

  	reagendarCita = () => {
  			//Que Procede Aqui? 
  	}

  	confirmarCita = () => {
  		axios.post(`${url}/confirmarCita`, {
  			CitaID: this.props.CitaID
  		})
  		.then((response) => {
  			var newInfo = this.state.info;
  			newInfo.Confirmada = 1;
  			this.setState({
  				info: newInfo
  			});
  		})
  	}

  	getModalidad = () => {
  		switch(this.state.info.Modalidad){
  			case '0': 
  				return "Presencial";
  			case '1':
  				return "En Linea";
  		}
  	}

  	getFormaDePago = () => {
  		switch(this.state.info.FormaDePago){
  			case '0':
  				return "Efectivo";
  			case '1':
  				return "Cheque";
  			case '2':
  				return "Tarjeta";
  			case '3':
  				return "Transefencia"
  		}
  	}

	render() {
		console.log(this.state.info);
		return(
			<div>
				<MuiThemeProvider theme={theme}>
					<div>
						<Header> Detalles de la Cita </Header>
					</div>
					<div>
						<div >
							<div>
								<IconButton color="primary" onClick={this.goBack}>
			       					 <ArrowBack />
			     				</IconButton>
			     			</div>
							<div className="MainPaper">
								<Paper elevation={1} >
									<div className="InnerPaperUpper">
										<Typography variant="h4" component="h3" color="primary">
									         {this.state.info.PacienteNombre} {this.state.info.PacienteApellidos}
										</Typography>
										<Typography variant="h5" component="h3" color="default">
									         Nutriologa: {this.props.NutriologaNombre}
										</Typography>
									</div>
									<div className="InnerPaperDivider">
										<Divider />
										<Divider />
									</div>
									<Typography variant="h5" component="h3" color="primary">
									         {this.getDateString()}
									</Typography>
									<Typography variant="h5" component="h3" color="default">
									         Telefono: {this.state.info.PacienteTelefono}
									</Typography>
									<Typography variant="h5" component="h3" color="default">
									         Modalidad: {this.getModalidad()}
									</Typography>
									<Typography variant="h5" component="h3" color="default">
									         Motivo: {this.state.info.Motivo}
									</Typography>
									<Typography variant="h5" component="h3" color="default">
									         Costo Cita: ${this.state.info.TotalPago}
									</Typography>
									<Typography variant="h5" component="h3" color="default">
									         Forma de Pago: {this.getFormaDePago()}
									</Typography>
									<div className="InnerPaperIconDiv">
										<div className="InnerPaperIconDiv">
											<Typography variant="h5" component="h3" color="default">
										         Pagado:
											</Typography>
				       					 		{this.displayDone(this.state.info.Pagado)}
										</div>
										<div className="InnerPaperIconDiv">
											<Typography variant="h5" component="h3" color="default">
										         Confirmado:
											</Typography>
												{this.displayDone(this.state.info.Confirmada)}
										</div>
									</div>
									<div className="InnerPaperDivider">
										<Divider />
									</div>
									<div>
										<div className={"InnerPaperButtonsDiv InnerPaperButtonsUpperDiv"}>
											<div className="InnerButtons">
												<Button onClick={this.confirmarCita} disabled={this.state.info.Confirmada == "1"} variant="contained" color="secondary">
									         		 Confirmar
									        	</Button>
								        	</div>
								        	<div className="InnerButtons">
									        	<Button onClick={this.pagarCita} disabled={this.state.info.Pagado == "1"} variant="contained" color="secondary">
									         		 Pagar
									        	</Button>
								        	</div>
								        	<div className="InnerButtons">
												<Button onClick={this.reagendarCita} variant="contained" color="secondary">
									         		 Reagendar
									        	</Button>
							        		</div>
							        		<div className="InnerButtons">
									        	<Button onClick={this.cancelarCita} variant="contained" color="secondary">
									         		 Cancelar
									        	</Button>
								        	</div>
							        	</div>
									</div>
								</Paper>
							</div>
						</div>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    CitaID: state.citaReducer.CitaID,
    NutriologaID: state.citaReducer.NutriologaID,
    NutriologaNombre: state.citaReducer.NutriologaNombre,
    UserType: state.userReducer.userType
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
      tryLogIn: (uId, userName, lastName, userType) => dispatch({type: 'LogIn', payload: {loggedIn: true, uId: uId, userName: userName, lastName: lastName, userType: userType}})
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(DetallesCita));
