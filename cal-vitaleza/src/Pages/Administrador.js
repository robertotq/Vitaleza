import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { ResponsiveBar } from '@nivo/bar';


import Header from '../Components/Header'
import LeftNavigation from '../Components/LeftNavigation';
import theme from '../Assets/Theme';
import './Administrador.css'

const axios = require('axios');
const url = 'http://127.0.0.1:5000';
const options = {year: 'numeric', month: 'long', day: 'numeric'};

function getStartOfWeek(){
	var d = new Date();
	var day = d.getDay(),
    diff = d.getDate() - day - 1 + (day === 0 ? -6:1); // adjust when day is sunday
  	var newD = new Date(d.setDate(diff));
  	return newD;
}

class Administrador extends Component {

	constructor(props){
		super(props);
		if(this.props.UserType === undefined || this.props.UserType === -1) {
			this.props.history.push('/');
		}
		this.state = {
			NutriologaID: -1,
			Nombre: 'Ana Cecy',
			Apellidos: '',
			Fecha: getStartOfWeek(),
			info: null
		}

	}

	componentDidMount(){
		this.next()
	}

	next = (events) => {
		axios.get(`${url}/siguienteNutriologa`, {
			params: {
				NutriologaID: this.state.NutriologaID
			}
		})
		.then((response) => {
			if(response.data === "None")
				return;
			this.setState({
				NutriologaID: response.data.ID,
				Nombre: response.data.Nombre,
				Apellidos: response.data.Apellidos
			});
			this.getInfo(this.state.Fecha)
		})
		.catch((error) => {
			console.log("Cant connect to the server");
		})
	}

	previous = (events) => {
		axios.get(`${url}/previousNutriologa`, {
			params: {
				NutriologaID: this.state.NutriologaID
			}
		})
		.then((response) => {
			if(response.data === "None")
				return;
			this.setState({
				NutriologaID: response.data.ID,
				Nombre: response.data.Nombre,
				Apellidos: response.data.Apellidos
			});
			this.getInfo(this.state.Fecha)
		})
		.catch((error) => {
			console.log("Cant connect to the server");
		})
	}

	printFecha = () => {
  		if(this.state.Fecha == undefined)
  			return;
  		return (this.state.Fecha).toLocaleString("es-mx", options)
  								 .split(' ')
							     .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
							     .join(' ');
  	}

  	sigSemana = () => {
		var day = new Date(this.state.Fecha);
		day.setDate(day.getDate() + 7);
		this.setState({
			Fecha: new Date(day.toLocaleString())
		});
		this.getInfo(day)
		return day;
	}

	prevSemana = () => {
		var day = new Date(this.state.Fecha);
		day.setDate(day.getDate() - 7);
		this.setState({
			Fecha: new Date(day.toLocaleString())
		});
		this.getInfo(day)
		return day;
	}

	getInfo = (startDay) => {
		var endDay = new Date(startDay)
		endDay.setDate(endDay.getDate() + 6)
		axios.get(`${url}/getReportes`, {
			params: {
				startDay: startDay,
				endDay: endDay,
				NutriologaID: this.state.NutriologaID
			}
		})
		.then((response) => {
			this.setState({
				info: response.data
			})
			console.log(response.data)
		})
	}

	renderGrafica = (index) => {
		var data = null;
		var label = ''
		if(this.state.info == null){
			return <div />
		}
		switch(index){
			case 1:
				data = this.state.info.cancelaciones
				label = "Cancelaciones"
				break;
			case 2:
				data = this.state.info.pacientes
				label = "Cantidad de Pacientes"
				break;
			case 3:
				data = this.state.info.modalidad
				label = "Cantidad de Modalidades"
				break;
			case 4:
				data = this.state.info.totalPago
				label = "Total de Pagos"
				break;
		}
		return(<Paper className="Graph">
				<Typography variant="h5" component="h3" color="primary">
					{label}
				</Typography>

				<ResponsiveBar
				axisBottom={{
		            "tickSize": 5,
		            "tickPadding": 5,
		            "tickRotation": 0,
		            "legend": "Fecha",
		            "legendPosition": "middle",
		            "legendOffset": 32
		        }}
		        margin={{
		            "top": 5,
		            "right": 10,
		            "bottom": 50,
		            "left": 10
		        }}
		        axisLeft={{
		            "tickSize": 5,
		            "tickPadding": 5,
		            "tickRotation": 0,
		            "legend": "Cantidad",
		            "legendPosition": "middle",
		            "legendOffset": -40
		        }}
		        labelFontSize={3}
				data={data}
				keys={["Count"]}
				indexBy="Date"
				animate={true}
		        padding={0.3}
        		colors="nivo"
		        
			/>
			</Paper>);
	}

	render() {
		return(
			<div>
				<Header> Administrador </Header>
				<Grid container>
					<Grid item xs={2}>
						<LeftNavigation userType={this.props.UserType}/>
					</Grid>
					<Grid item xs={10}>
						<div className="MainPaperOuter">
							<Paper className="MainPaperAdmin">
								<MuiThemeProvider theme={theme}>
									<div className="InnerButtons">
										<IconButton aria-label="Delete" color="primary" onClick={this.previous}>
					       					 <ArrowBackIos />
					     				</IconButton>
										<Typography variant="h5" component="h3" color="primary">
											          {this.state.Nombre}
										</Typography>
							            <IconButton aria-label="Delete" color="primary" onClick={this.next}>
					       					 <ArrowForwardIos />
					     				</IconButton>
				     				</div>
				     				<div>
		     							<div className="DateButtonsOuter">
								    		<div className="DateButtons">
									    		<Button variant="contained" color="primary" onClick={this.prevSemana}>
									              Previo
									    		</Button>
								    		</div>
								    		<div className="DateButtons">
									    		<Button variant="contained" color="primary" onClick={this.sigSemana}>
									              Siguiente
									    		</Button>
								    		</div>
							    		</div>
				     				</div>
				     				<div className="InnerPaperDivider">
										<Divider />
										<Divider />
									</div>
									<Typography variant="h6" component="h3" color="primary"> 
										Semana del: {this.printFecha()}
									</Typography>
									<div className="GraphsRow">
										{this.renderGrafica(1)}
										{this.renderGrafica(2)}
									</div>
									<div className="GraphsRow">
										{this.renderGrafica(3)}
										{this.renderGrafica(4)}
									</div>
					            </MuiThemeProvider>
							</Paper>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
  	NutriologaID: state.citaReducer.NutriologaID,
  	Fecha: state.citaReducer.Fecha,
  	NutriologaNombre: state.citaReducer.NutriologaNombre,
  	UserType: state.userReducer.userType
  };
};

const mapDispatchtoProps = dispatch => {
  return {
      changeToDetails: (CitaID, NutriologaID, Semana, NutriologaNombre) => dispatch({type: 'changeToDetails', payload: {CitaID: CitaID, NutriologaID: NutriologaID, Semana: Semana, NutriologaNombre: NutriologaNombre}}),
      changeToCreateCita: (NutriologaID, Fecha, NutriologaNombre) => dispatch({type: 'changeToCreateCita', payload: {NutriologaID: NutriologaID, Fecha: Fecha, NutriologaNombre: NutriologaNombre}})
      };
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Administrador));