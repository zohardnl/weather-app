import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { WeatherStore, WeatherState } from "./weather.store";
import { Observable } from "rxjs";
import { autoComplete, Weather } from "./weather.model";

@Injectable({ providedIn: "root" })
export class WeatherQuery extends QueryEntity<WeatherState> {
	constructor(protected store: WeatherStore) {
		super(store);
	}

	weatherList$: Observable<Weather[]> = this.selectAll();

	isLoading$: Observable<boolean> = this.select(store => store.isLoading);

	currentWeather$: Observable<Weather> = this.select(store => store.currentWeather);

	autoComplete$: Observable<autoComplete[]> = this.select(store => store.autoComplete);

	validSearch$: Observable<boolean> = this.select(store => store.searchValid);

	sliderChecked$: Observable<boolean> = this.select(store => store.sliderChecked);
}
