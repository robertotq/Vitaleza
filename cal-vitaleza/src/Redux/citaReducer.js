const initialCitaState = {
	CitaID: -1,
	NutriologaID: -1,
	Fecha: null,
	NutriologaNombre: ''
}

const citaReducer = (state = initialCitaState, action) => {
	switch( action.type ) {
		case 'changeToDetails':
			console.log('reduced');
			console.log(action.payload.CitaID);
			console.log(initialCitaState.CitaID);
			return { CitaID: action.payload.CitaID, NutriologaID: action.payload.NutriologaID, Semana: action.payload.Semana, NutriologaNombre: action.payload.NutriologaNombre}
		default:
			return state;
	}
};

export default citaReducer;