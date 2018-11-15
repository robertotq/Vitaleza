import {createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/deepPurple';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
	typography: {
    	useNextVariants: true,
  	},
	palette: {
		primary: purple,
		secondary: {
			main: '#E6E6FA',
		},
		error: red
	}
});

export default theme;