const initialState = {
	loggedIn: false,
	userId: -1,
	userName: '',
	LastName: '',
	userType: -1
}

const reducer = (state = initialState, action) => {
	switch( action.type ) {
		case 'LogIn':
			return {loggedIn: true, userId: action.payload.uId, userName: action.payload.userName, LastName: action.payload.lastName, userType: action.payload.usertype}
		default:
			return state;
	}
};

export default reducer;
