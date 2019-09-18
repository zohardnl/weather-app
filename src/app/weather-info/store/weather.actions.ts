import { Action } from "@ngrx/store";

export const SEARCH_WEATHER = "SEARCH_WEATHER";

export const CLEAR_WEATHER = "CLEAR_WEATHER";

export class SearchWeather implements Action {
	readonly type = SEARCH_WEATHER;

	constructor(public payload: any[]) {}
}

export class CleanWeather implements Action {
	readonly type = CLEAR_WEATHER;

	constructor(public payload: any[]) {}
}

export type weatherActions = SearchWeather | CleanWeather;
