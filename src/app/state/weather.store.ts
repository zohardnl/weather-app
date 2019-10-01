import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";

export interface WeatherState extends EntityState<any> {
	weatherList: any[];
	favoriteList: any[];
}

const initialState = {
	weatherList: [],
	favoriteList: []
};

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "weather" })
export class WeatherStore extends EntityStore<WeatherState> {
	constructor() {
		super(initialState);
	}
}
