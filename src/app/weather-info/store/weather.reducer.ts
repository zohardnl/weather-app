import * as SearchWeatherActions from "./weather.actions";

export interface AppState {
	weather: State;
}

export interface State {
	weatherList: any[];
	favoriteList: any[];
}

const initialState: State = {
	weatherList: [],
	favoriteList: []
};

export function weatherReducer(
	state: State = initialState,
	action: SearchWeatherActions.weatherActions
) {
	switch (action.type) {
		case SearchWeatherActions.SEARCH_WEATHER:
			return {
				...state,
				weatherList: [...state.weatherList, ...action.payload]
			};

		case SearchWeatherActions.CLEAR_WEATHER:
			return {
				...state,
				weatherList: [...action.payload]
			};

		case SearchWeatherActions.ADD_FAVORITE:
			return {
				...state,
				favoriteList: [...state.favoriteList, action.payload]
			};

		default:
			return state;
	}
}
