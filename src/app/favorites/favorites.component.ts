import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromWeather from "../weather-info/store/weather.reducer";
import { environment } from "../../environments/environment";
import { ApiService } from "../services/api.service";

@Component({
	selector: "app-favorites",
	templateUrl: "./favorites.component.html",
	styleUrls: ["./favorites.component.scss"]
})
export class FavoritesComponent implements OnInit {
	favoriteList: any[] = [];

	constructor(private store: Store<fromWeather.AppState>, private api: ApiService) {}

	ngOnInit() {
		this.store.select("weather").subscribe(arr => {
			this.favoriteList = arr.favoriteList;
		});
	}

	getImage(img: string) {
		return `${environment.apiImage}${img}@2x.png`;
	}
}
