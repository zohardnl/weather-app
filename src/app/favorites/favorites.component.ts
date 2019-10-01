import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import { ApiService } from "../services/api.service";
import { WeatherService } from "../state";

@Component({
	selector: "app-favorites",
	templateUrl: "./favorites.component.html",
	styleUrls: ["./favorites.component.scss"]
})
export class FavoritesComponent implements OnInit {
	favoriteList: any[] = [];

	constructor(private api: ApiService, private weather: WeatherService) {}

	ngOnInit() {
		this.weather.getfavoriteList().subscribe(list => {
			this.favoriteList = list;
		});
	}

	getImage(img: string) {
		return `${environment.apiImage}${img}@2x.png`;
	}
}
