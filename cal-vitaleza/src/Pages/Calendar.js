import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import Header from '../Components/Header'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import theme from '../Assets/Theme';
//TESTING
import './Calendar.css';

const axios = require('axios');
const url = 'http://127.0.0.1:5000';

const localizer = BigCalendar.momentLocalizer(moment)

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getStartOfWeek(){
	var d = new Date();
	var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

class Calendar extends Component {

	constructor(...args){
		super(...args)

		this.state = { 
			NutriologaID: this.props.NutriologaID,
			citas: [],
			Nombre: 'Ana Cecy',
			Apellidos: '',
			semana: getStartOfWeek() 
		};

		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.getCitas = this.getCitas.bind(this);
		this.getCustomToolbar = this.getCustomToolbar.bind(this);
		this.eventStyleGetter = this.eventStyleGetter.bind(this);
	}

	componentDidMount(){
		if (this.state.NutriologaID == -1)
			this.next()
		else {
			this.getCitas();
			this.setState({
				Nombre: this.props.NutriologaNombre
			});
		}	
	}

	next(events){
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
			this.getCitas();
		})
		.catch((error) => {
			console.log("Cant connect to the server");
		})
	}

	previous(events){
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
			this.getCitas();
		})
		.catch((error) => {
			console.log("Cant connect to the server");
		})
	}

	getCustomToolbar = (toolbar) =>  {
		this.toolbarDate = toolbar.date;
		const goToBack = () => {
		  toolbar.onNavigate('next', this.prevSemana());
		  //this.getCalendarEvents(newDate);

		}
		const goToNext = () => {
		  toolbar.onNavigate('next', this.sigSemana());
		 //this.getCalendarEvents(newDate);
		}

		const goToToday = () => {
			var day = new Date();
			this.setState({
				semana: getStartOfWeek()
			});
			toolbar.onNavigate('today', day);
		}

		return (
		    <div className="ToolbarCalendar">
		    	<MuiThemeProvider theme={theme}>
		    		<Grid container>
			        	<Grid item xs={6}>
					        <Typography variant="h5" component="h3" color="primary">
								          {capitalizeFirstLetter(this.state.semana.toLocaleString("es-mx", {month: "long" }))}
							</Typography>
						</Grid>
						<Grid item xs={6}>
				    		<div className="ToolbarButtons">
				    			<div className="ToolbarItem">
							    	<Button onClick={goToBack} variant="contained" color="secondary">
							          Atrás
							        </Button>
						        </div>
						        <div className="ToolbarItem">
							        <Button onClick={goToNext} variant="contained" color="secondary">
							          Siguiente
							        </Button>
						        </div>
						        <div className="ToolbarItem">
							        <Button onClick={goToToday} variant="contained" color="secondary">
							          Hoy
							        </Button>
						        </div>
					        </div>
			        	</Grid>
					</Grid>
	            </MuiThemeProvider>
		    </div>
		)
	}

	getCitas(semana = this.state.semana){
		var finSemana = new Date(semana);
		finSemana.setDate(finSemana.getDate() + 6);
		axios.get(`${url}/getCitas`, {
			params: {
				NutriologaID: this.state.NutriologaID,
				semana: semana,
				finSemana: finSemana
			}
		})
		.then((response) => {
			var nuevasCitas = [];
			console.log(response.data);
			var i;
			for(i = 0; i < response.data.length; i++){
				var cita = response.data[i];
				const finCita = moment(cita.FechaAgendada).add(30, 'm').toDate();
				cita.FinalCita = finCita;
				cita.FechaAgendada = moment(cita.FechaAgendada).toDate();
				console.log(cita);
				nuevasCitas.push(cita);
			}
			this.setState({
				citas: response.data
			});
			console.log(response.data);
		})
	}

	sigSemana(){
		var day = new Date(this.state.semana);
		day.setDate(day.getDate() + 7);
		this.setState({
			semana: new Date(day.toLocaleString())
		});
		this.getCitas(day);
		return day;
	}

	prevSemana(){
		var day = new Date(this.state.semana);
		day.setDate(day.getDate() - 7);
		this.setState({
			semana: new Date(day.toLocaleString())
		});
		this.getCitas(day);
		return day;
	}

	hacerCita = ({start, end}) => {
		console.log(start);
	}

	verDetalles = (event) => {
		this.props.changeToDetails(event.ID, this.state.NutriologaID, this.state.semana, this.state.Nombre);
		this.props.history.push('/detallesCita');
		//Pass a una nueva ventana para ver la info
	}

	eventStyleGetter(event, start, end, isSelected) {
		var backgroundColor = '';
		if(event.Confirmada == 0){
			backgroundColor = '#D3D3D3'
		}
		else backgroundColor = '#E6E6FA'
		var style = {
			backgroundColor: backgroundColor,
        	borderRadius: '0px',
        	opacity: 0.8,
        	color: 'black',
        	border: '0px'
		};
		return {
			style: style
		};
	}

	render() {
		return(
			<div>
			<div>
				<Header> Calendario </Header>
			</div>
			<Grid container>
				<Grid item xs={2} className="LeftCalendar">
					hello
				</Grid>
				<Grid item xs={10}>
					<div className="NutriologaCalendar">
						<MuiThemeProvider theme={theme}>
							<IconButton aria-label="Delete" color="primary" onClick={this.previous}>
		       					 <ArrowBackIos />
		     				</IconButton>
							<Typography variant="h5" component="h3" color="primary">
								          {this.state.Nombre}
							</Typography>
				            <IconButton aria-label="Delete" color="primary" onClick={this.next}>
		       					 <ArrowForwardIos />
		     				</IconButton>
			            </MuiThemeProvider>
					</div>
					<div className="PreMainPaper">
						<Paper className="MainCalendarPaper">
							<div className="MainCalendar">
								<BigCalendar
									selectable
									localizer={localizer}
									events={this.state.citas}
									defaultView={BigCalendar.Views.WEEK}
									components={{
										toolbar: this.getCustomToolbar
									}}
									onSelectSlot={this.hacerCita}
									onSelectEvent={this.verDetalles}
									titleAccessor="Nombre"
									startAccessor="FechaAgendada"
									endAccessor="FinalCita"
									eventPropGetter={(this.eventStyleGetter)}
									hideTimeIndicator
								/>
							</div>
						</Paper>
					</div>
				</Grid>
			</Grid>
			</div>
		)
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
      changeToDetails: (CitaID, NutriologaID, Semana, NutriologaNombre) => dispatch({type: 'changeToDetails', payload: {CitaID: CitaID, NutriologaID: NutriologaID, Semana: Semana, NutriologaNombre: NutriologaNombre}})
      };
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Calendar));