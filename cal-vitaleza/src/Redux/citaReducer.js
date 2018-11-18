const initialCitaState = {
	CitaID: -1,
	NutriologaID: -1,
	Semana: null,
	Fecha: null,
	NutriologaNombre: ''
}

const citaReducer = (state = initialCitaState, action) => {
	switch( action.type ) {
		case 'changeToDetails':
			return { CitaID: action.payload.CitaID, NutriologaID: action.payload.NutriologaID, Semana: action.payload.Semana, NutriologaNombre: action.payload.NutriologaNombre}
		case 'changeToCreateCita':
			return { NutriologaID: action.payload.NutriologaID, Fecha: action.payload.Fecha, NutriologaNombre: action.payload.NutriologaNombre}
		case 'logOut':
			return initialCitaState;
		default:
			return state;
	}
};

export default citaReducer;