import * as SearchWeatherActions from "./weather.actions";

export interface AppState {
	weather: State;
}

export interface State {
	weatherList: [];
}

const initialState: State = {
	weatherList: []
};

export function weatherReducer(
	state: State = initialState,
	action: SearchWeatherActions.weatherActions
) {
	switch (action.type) {
		case SearchWeatherActions.SEARCH_WEATHER:
			return {
				...state,
				weatherList: [...action.payload]
			};

		case SearchWeatherActions.CLEAR_WEATHER:
			return {
				...state,
				weatherList: [...action.payload]
			};

		default:
			return state;
	}
}
