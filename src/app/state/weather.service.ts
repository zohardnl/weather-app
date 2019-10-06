import { Injectable } from "@angular/core";
import { WeatherStore, WeatherState } from "./weather.store";
import { NgEntityService } from "@datorama/akita-ng-entity-service";
import { WeatherQuery } from "./weather.query";
import { Weather } from "./weather.model";

@Injectable({ providedIn: "root" })
export class WeatherService extends NgEntityService<WeatherState> {
	constructor(protected store: WeatherStore, private query: WeatherQuery) {
		super(store);
	}

	updateWeather(data: Weather[]) {
		this.store.update({ weatherList: data });
	}

	updateFavorite(data: Weather) {
		this.store.update({ favoriteList: [...this.store._value().favoriteList, data] });
	}

	removeFavorite(item: Weather) {
		let arr: Weather[];
		arr = this.store._value().favoriteList;
		arr = arr.filter(val => val !== item);
		this.store.update({ favoriteList: arr });
	}

	getWeatherList() {
		return this.query.weatherList$;
	}

	getfavoriteList() {
		return this.query.favoriteList$;
	}
}
