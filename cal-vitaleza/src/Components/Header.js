import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import MeetingRoom from '@material-ui/icons/MeetingRoom';
import theme from '../Assets/Theme';

import logo from '../Assets/logo.png';
import './components.css';


class PageHeader extends Component {

logout = () => {
	this.props.logout();
	this.props.history.push('/');
}

render() {
	return(
		<div>
			<div className="Header">
				<img src={logo} className="Header-Logo"alt="logo" />
				<MuiThemeProvider theme={theme}>
				<Typography variant="h5" component="h3" color="primary">
			        {this.props.children}
				</Typography>
				<div className="LogOutIcon">
					<IconButton color="primary" onClick={this.logout}>
			       					 <MeetingRoom style={{ fontSize: 50 }}/>
			     	</IconButton>
		     	</div>
				</MuiThemeProvider>
			</div>
			<Divider />
		</div>
		);
		}
	}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchtoProps = dispatch => {
  return {
      logout: () => dispatch({type: 'logOut'})
      };
};

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(PageHeader));