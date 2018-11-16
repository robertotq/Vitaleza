import { combineReducers } from 'redux';
import userReducer from './userReducer';
import citaReducer from './citaReducer';

const reducer = combineReducers({userReducer, citaReducer});

export default reducer;
