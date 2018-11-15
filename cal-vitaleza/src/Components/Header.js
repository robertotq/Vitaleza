import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import logo from '../Assets/logo.png';
import './components.css';

const theme = createMuiTheme({
	typography: {
    	useNextVariants: true,
  	},
	palette: {
		primary: purple,
		secondary: green,
		error: red
	}
});

class PageHeader extends Component {

render() {
	return(
		<div>
			<div className="Header">
				<img src={logo} className="Header-Logo"alt="logo" />
				<MuiThemeProvider theme={theme}>
				<Typography variant="h5" component="h3" color="primary">
			        {this.props.children}
				</Typography>
				</MuiThemeProvider>
			</div>
			<Divider />
		</div>
		);
		}
	}

export default PageHeader;