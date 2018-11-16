import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { MuiThemeProvider } from '@material-ui/core/styles';


import Header from '../Components/Header';
import theme from '../Assets/Theme';
import './DetallesCita.css'
const axios = require('axios');
const url = 'http://127.0.0.1:5000';
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

class DetallesCita extends Component {

	constructor(props) {
    super(props);
    this.state = { info: '' };
  	}

  	componentDidMount(){
  		if(this.props.CitaID == -1)
  			this.props.history.goBack();
  		console.log(this.props.CitaID);
  		axios.get(`${url}/citaDetalles`, {
			params: {
			  CitaID: this.props.CitaID
			}
		})
		.then((response) => {
			this.setState({
				info: response.data
			});
			console.log(response);
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

  	displayConfirmado = (info) => {
  		if(info == 0)
  			return <Clear />
  		else
  			return <Done />
  	}

	render(){
		console.log(this.state.info);
		return(
			<div>
				<MuiThemeProvider theme={theme}>
					<div>
						<Header> Detalles de la Cita </Header>
					</div>
					<div>
						<Grid container>
							<Grid item xs={1}>
								<IconButton aria-label="Delete" color="primary" onClick={this.goBack}>
			       					 <ArrowBack />
			     				</IconButton>
							</Grid>
							<Grid item xs={11} className="MainPaper">
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
									         Modalidad: {this.state.info.Modalidad}
									</Typography>
									<Typography variant="h5" component="h3" color="default">
									         Motivo: {this.state.info.Motivo}
									</Typography>
									<Typography variant="h5" component="h3" color="default">
									         Costo Cita: {this.state.info.TotalPago}
									</Typography>
									<Typography variant="h5" component="h3" color="default">
									         Forma de Pago: {this.state.info.FormaDePago}
									</Typography>
									<div className="InnerPaperIconDiv">
										<div className="InnerPaperIconDiv">
											<Typography variant="h5" component="h3" color="default">
										         Pagado:
											</Typography>
											<IconButton aria-label="Delete" color="primary">
				       					 		{this.displayConfirmado(this.state.info.Pagado)}
				     						</IconButton>
										</div>
										<div className="InnerPaperIconDiv">
											<Typography variant="h5" component="h3" color="default">
										         Confirmado:
											</Typography>
											<IconButton aria-label="Delete" color="primary">
												{this.displayConfirmado(this.state.info.Confirmada)}
				     						</IconButton>
										</div>
									</div>
								</Paper>
							</Grid>
						</Grid>
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
    NutriologaNombre: state.citaReducer.NutriologaNombre
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
      tryLogIn: (uId, userName, lastName, userType) => dispatch({type: 'LogIn', payload: {loggedIn: true, uId: uId, userName: userName, lastName: lastName, userType: userType}})
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(DetallesCita));
