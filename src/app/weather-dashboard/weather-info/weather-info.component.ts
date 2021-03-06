import { Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import * as moment from "moment";
import { environment } from "../../../environments/environment";
import { Weather, WeatherService } from "../../state";
import { ModalService } from "../../services/modal.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
	selector: "app-weather-info",
	templateUrl: "./weather-info.component.html",
	styleUrls: ["./weather-info.component.scss"]
})
export class WeatherInfoComponent implements OnInit, OnDestroy {
	weatherList: Weather[] = [];
	favoriteList: Weather[] = [];
	currentWeather: Weather;
	isLoading: boolean;
	private weatherSub: Subscription;
	private favoriteSub: Subscription;
	private loadingSub: Subscription;
	private currentSub: Subscription;

	constructor(
		private api: ApiService,
		private weather: WeatherService,
		private modal: ModalService,
		private router: Router
	) {}

	ngOnInit() {
		this.api.getWeather();
		this.weatherSub = this.weather.getWeatherList().subscribe(list => {
			this.weatherList = list;
		});
		this.favoriteSub = this.api.getFavWeatherListener().subscribe(list => {
			this.favoriteList = list;
		});
		this.loadingSub = this.weather.getLoading().subscribe(load => {
			this.isLoading = load;
		});
		this.currentSub = this.weather.getCurrentWeather().subscribe(weather => {
			this.currentWeather = weather;
		});
	}

	getDay(day: string) {
		return moment(day).format("dddd");
	}

	getImage(img: string) {
		if (+img >= 1 && +img < 10) {
			img = "0" + img;
		}
		return `${environment.apiImage}/${img}-s.png`;
	}

	addToFavorite(favorite: Weather) {
		let index: number;
		index = this.favoriteList.findIndex(val => val.name === favorite.name);

		if (index > -1) {
			this.modal.openModal("This location already exist!", "Favorite");
		} else {
			this.api.updateDbFav(favorite);
			this.weather.setSliderStatus(true);
			this.router.navigate(["favorites"]);
		}
	}

	ngOnDestroy(): void {
		this.weatherSub.unsubscribe();
		this.favoriteSub.unsubscribe();
		this.loadingSub.unsubscribe();
		this.currentSub.unsubscribe();
	}
}
