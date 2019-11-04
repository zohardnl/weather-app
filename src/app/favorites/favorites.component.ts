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
	private isLoadingSub: Subscription;

	constructor(private api: ApiService, private weather: WeatherService, private router: Router) {}

	ngOnInit() {
		this.api.getWeather();
		this.weatherSub = this.api.getFavWeatherListener().subscribe(res => {
			this.favoriteList = res;
		});
		this.isLoadingSub = this.weather.getLoading().subscribe(load => {
			this.isLoading = load;
		});
	}

	sendToInfo(value: number, city?: string) {
		this.api.getForecast(value).subscribe();
		this.api.getWeatherByKey(value, city).subscribe();
		this.router.navigate(["weather"]);
	}

	removeFavorite(itemId: string) {
		this.api.removeFav(itemId);
	}

	ngOnDestroy(): void {
		this.weatherSub.unsubscribe();
		this.isLoadingSub.unsubscribe();
	}
}
