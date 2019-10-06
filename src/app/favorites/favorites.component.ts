import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import { ApiService } from "../services/api.service";
import { Weather, WeatherService } from "../state";
import { Router } from "@angular/router";

@Component({
	selector: "app-favorites",
	templateUrl: "./favorites.component.html",
	styleUrls: ["./favorites.component.scss"]
})
export class FavoritesComponent implements OnInit {
	favoriteList: Weather[] = [];

	constructor(public api: ApiService, private weather: WeatherService, private router: Router) {}

	ngOnInit() {
		this.weather.getfavoriteList().subscribe(list => {
			this.favoriteList = list;
		});
	}

	sendToInfo(value: string) {
		this.api.sendWeatherRequest(value);
		this.router.navigate([""]);
	}

	removeFavorite(item: Weather) {
		this.weather.removeFavorite(item);
	}
}
