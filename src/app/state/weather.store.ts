import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { autoComplete, Weather } from "./weather.model";

export interface WeatherState extends EntityState<Weather> {
	isLoading: boolean;
	searchValid: boolean;
	currentWeather: Weather;
	autoComplete: autoComplete[];
	sliderChecked: boolean;
}

const initialState = {
	isLoading: false,
	searchValid: false,
	currentWeather: null,
	autoComplete: [],
	sliderChecked: null
};

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "weather" })
export class WeatherStore extends EntityStore<WeatherState> {
	constructor() {
		super(initialState);
	}
}
