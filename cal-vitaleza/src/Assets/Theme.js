import {createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/deepPurple';
const theme = createMuiTheme({
	typography: {
    	useNextVariants: true,
  	},
	palette: {
		primary: purple,
		secondary: {
			main: '#E6E6FA',
		},
		error: {
			main: '#FF6961'
		}
	}
});

export default theme;