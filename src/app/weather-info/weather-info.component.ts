import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import * as moment from "moment";
import { environment } from "../../environments/environment";
import { WeatherService } from "../state";
import { ModalService } from "../services/modal.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-weather-info",
	templateUrl: "./weather-info.component.html",
	styleUrls: ["./weather-info.component.scss"]
})
export class WeatherInfoComponent implements OnInit {
	weatherList: any[] = [];
	favoriteList: any[] = [];

	constructor(
		private api: ApiService,
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

	addToFavorite(favorite: any) {
		if (!this.favoriteList.includes(favorite)) {
			this.weather.updateFavorite(favorite);
			this.router.navigate(["favorites"]);
		} else {
			this.modal.openModal("This city already exist!", "Favorite");
		}
	}
}
