import { Action } from "@ngrx/store";

export const SEARCH_WEATHER = "SEARCH_WEATHER";

export const CLEAR_WEATHER = "CLEAR_WEATHER";

export const ADD_FAVORITE = "ADD_FAVORITE";

export class SearchWeather implements Action {
	readonly type = SEARCH_WEATHER;

	constructor(public payload: any[]) {}
}

export class ClearWeather implements Action {
	readonly type = CLEAR_WEATHER;

	constructor(public payload: any[]) {}
}

export class AddFavorite implements Action {
	readonly type = ADD_FAVORITE;

	constructor(public payload: any) {}
}

export type weatherActions = SearchWeather | ClearWeather | AddFavorite;
