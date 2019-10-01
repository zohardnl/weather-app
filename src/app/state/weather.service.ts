import { Injectable } from "@angular/core";
import { WeatherStore, WeatherState } from "./weather.store";
import { NgEntityService } from "@datorama/akita-ng-entity-service";
import { WeatherQuery } from "./weather.query";

@Injectable({ providedIn: "root" })
export class WeatherService extends NgEntityService<WeatherState> {
	constructor(protected store: WeatherStore, private query: WeatherQuery) {
		super(store);
	}

	updateWeather(data: any[]) {
		this.store.update({ weatherList: data });
	}

	updateFavorite(data: any) {
		this.store.update({ favoriteList: [...this.store._value().favoriteList, data] });
	}

	getWeatherList() {
		return this.query.weatherList$;
	}

	getfavoriteList() {
		return this.query.favoriteList$;
	}
}
