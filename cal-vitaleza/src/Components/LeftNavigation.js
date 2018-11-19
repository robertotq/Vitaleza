import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DateRange from '@material-ui/icons/DateRange';
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined';
import AddBox from '@material-ui/icons/AddBox';

import { MuiThemeProvider} from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import theme from '../Assets/Theme';
import './components.css'

class LeftNavigation extends Component {

	constructor(props){
		super(props);
	}

	toCalendar = () => {
		this.props.history.push('/calendario');
	}

	toAdmin = () => {
		this.props.history.push('/administrador');
	}

	toNewEmployee = () => {
		this.props.history.push('/crearEmpleado');
	}

	renderNavigation = () => {
		if(this.props.userType == 0){
			return(
				<div className="IconsDiv">
					<div className="Icon">
						<Button color="primary" onClick={this.toAdmin}>
					       					 <InsertChartOutlined  style={{ fontSize: 50 }}/>
					     </Button>
				     </div>
				     <div className="Icon">
				     <Button color="primary" onClick={this.toNewEmployee}>
				       					 <AddBox  style={{ fontSize: 50 }}/>
				     </Button>
				     </div>
		     	</div>
		     );
		}
		return ;
	}

	render() {
		return(
			<div className="LeftNav">
				<MuiThemeProvider theme={theme}>
				<div className="Icon">
					<Button aria-label="Delete" color="primary" onClick={this.toCalendar}>
			       					 <DateRange style={{ fontSize: 50 }}/>
			     	</Button>
		     	</div>
				
				{this.renderNavigation()}
				</MuiThemeProvider>
			</div>
			);
	}
}

export default withRouter(LeftNavigation);