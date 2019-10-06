import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import * as moment from "moment";
import { environment } from "../../environments/environment";
import { Weather, WeatherService } from "../state";
import { ModalService } from "../services/modal.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-weather-info",
	templateUrl: "./weather-info.component.html",
	styleUrls: ["./weather-info.component.scss"]
})
export class WeatherInfoComponent implements OnInit {
	weatherList: Weather[] = [];
	favoriteList: Weather[] = [];

	constructor(
		public api: ApiService,
		private weather: WeatherService,
		private modal: ModalService,
		private router: Router
	) {}

	ngOnInit() {
		this.weather.getWeatherList().subscribe(list => {
			this.weatherList = list;
		});
		this.weather.getfavoriteList().subscribe(list => {
			this.favoriteList = list;
		});
	}

	getDay(day: string) {
		return moment(day).format("dddd");
	}

	getImage(img: string) {
		return `${environment.apiImage}${img}@2x.png`;
	}

	addToFavorite(favorite: Weather) {
		let index: number;
		index = this.favoriteList.findIndex(val => val.name === favorite.name);

		if (index > -1) {
			this.modal.openModal("This location already exist!", "Favorite");
		} else {
			this.weather.updateFavorite(favorite);
			this.router.navigate(["favorites"]);
		}
	}
}
