import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { WeatherStore, WeatherState } from "./weather.store";
import { Observable } from "rxjs";
import { Weather } from "./weather.model";

@Injectable({ providedIn: "root" })
export class WeatherQuery extends QueryEntity<WeatherState> {
	constructor(protected store: WeatherStore) {
		super(store);
	}

	weatherList$: Observable<Weather[]> = this.selectAll();

	isLoading$: Observable<boolean> = this.select(store => store.isLoading);
}
