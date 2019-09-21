import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import * as moment from "moment";
import { Store } from "@ngrx/store";
import * as fromWeather from "./store/weather.reducer";
import { environment } from "../../environments/environment";
import * as WeatherActions from "../weather-info/store/weather.actions";

@Component({
	selector: "app-weather-info",
	templateUrl: "./weather-info.component.html",
	styleUrls: ["./weather-info.component.scss"]
})
export class WeatherInfoComponent implements OnInit {
	weatherList: any[] = [];

	constructor(private api: ApiService, private store: Store<fromWeather.AppState>) {}

	ngOnInit() {
		this.store.select("weather").subscribe(arr => {
			this.weatherList = arr.weatherList;
		});
	}

	getDay(day: string) {
		return moment(day).format("dddd");
	}

	getImage(img: string) {
		return `${environment.apiImage}${img}@2x.png`;
	}

	addToFavorite(item: any) {
		this.store.dispatch(new WeatherActions.AddFavorite(item));
	}
}
