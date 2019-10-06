import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Weather } from "./weather.model";

export interface WeatherState extends EntityState<Weather> {
	weatherList: Weather[];
	favoriteList: Weather[];
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
