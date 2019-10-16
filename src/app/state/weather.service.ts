import { Injectable } from "@angular/core";
import { WeatherStore, WeatherState } from "./weather.store";
import { NgEntityService } from "@datorama/akita-ng-entity-service";
import { WeatherQuery } from "./weather.query";
import { Weather } from "./weather.model";
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

	setLoading(loader: boolean) {
		this.store.update({ isLoading: loader });
	}

	getWeatherList(): Observable<Weather[]> {
		return this.query.weatherList$;
	}

	getLoading() {
		return this.query.isLoading$;
	}
}
