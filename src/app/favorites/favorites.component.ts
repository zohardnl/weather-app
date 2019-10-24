import { Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Weather, WeatherService } from "../state";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
	selector: "app-favorites",
	templateUrl: "./favorites.component.html",
	styleUrls: ["./favorites.component.scss"]
})
export class FavoritesComponent implements OnInit, OnDestroy {
	favoriteList: Weather[] = [];
	isLoading: boolean;
	private weatherSub: Subscription;

	constructor(private api: ApiService, public weather: WeatherService, private router: Router) {}

	ngOnInit() {
		this.api.getWeather();
		this.weatherSub = this.api.getFavWeatherListener().subscribe(res => {
			this.favoriteList = res;
		});
		this.weather.getLoading().subscribe(load => {
			this.isLoading = load;
		});
	}

	sendToInfo(value: string) {
		this.api.sendWeatherRequest(value).subscribe();
		this.router.navigate(["weather"]);
	}

	removeFavorite(itemId: string) {
		this.api.removeFav(itemId);
	}

	ngOnDestroy(): void {
		this.weatherSub.unsubscribe();
	}
}
