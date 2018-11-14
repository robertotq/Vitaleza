import React, { Component } from 'react';
//TESTING
import events from '../events';
import '../App.css';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';

const localizer = BigCalendar.momentLocalizer(moment)

class Calendar extends Component {

	constructor(...args){
		super(...args)

		this.state = { events };
	}

	render() {
		return(
			<div>
			<div className="Calendar">
				<BigCalendar
					localizer={localizer}
					events={this.state.events}
					defaultView={BigCalendar.Views.WEEK}
				/>
			</div>
			</div>
		)
	}

}


export default Calendar;