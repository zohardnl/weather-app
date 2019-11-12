import { Injectable } from "@angular/core";
import { WeatherStore, WeatherState } from "./weather.store";
import { NgEntityService } from "@datorama/akita-ng-entity-service";
import { WeatherQuery } from "./weather.query";
import { autoComplete, Weather } from "./weather.model";
import { guid } from "@datorama/akita";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class WeatherService extends NgEntityService<WeatherState> {
	constructor(protected store: WeatherStore, private query: WeatherQuery) {
		super(store);
	}

	updateWeather(data: Weather[]) {
		data.forEach(entity => {
			entity.id = guid();
		});
		this.store.set(data);
	}

	updateCurrent(item: Weather) {
		this.store.update({ currentWeather: item });
	}

	updateAutoComplete(arr: autoComplete[]) {
		this.store.update({ autoComplete: arr });
	}

	setLoading(loader: boolean) {
		this.store.update({ isLoading: loader });
	}

	setValidToSearch(val: boolean) {
		this.store.update({ searchValid: val });
	}

	setSliderStatus(val: boolean) {
		this.store.update({ sliderChecked: val });
	}

	getWeatherList(): Observable<Weather[]> {
		return this.query.weatherList$;
	}

	getAutoComplete(): Observable<autoComplete[]> {
		return this.query.autoComplete$;
	}

	getCurrentWeather(): Observable<Weather> {
		return this.query.currentWeather$;
	}

	getLoading(): Observable<boolean> {
		return this.query.isLoading$;
	}

	getValidSearch() {
		return this.query.validSearch$;
	}

	getSliderStatus() {
		return this.query.sliderChecked$;
	}
}
