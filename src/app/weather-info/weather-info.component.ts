import { AfterContentInit, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../services/api.service";
import * as moment from "moment";
import { Store } from "@ngrx/store";
import * as fromWeather from "./store/weather.reducer";
import { environment } from "../../environments/environment";

@Component({
	selector: "app-weather-info",
	templateUrl: "./weather-info.component.html",
	styleUrls: ["./weather-info.component.scss"]
})
export class WeatherInfoComponent implements OnInit, AfterContentInit {
	list$: Observable<{ weatherList: any[] }>;

	constructor(private api: ApiService, private store: Store<fromWeather.AppState>) {}

	ngOnInit() {
		this.list$ = this.store.select("weather");
		//this.list$.subscribe(value => console.log(value.weatherList));
	}

	ngAfterContentInit(): void {}

	getDay(day: string) {
		return moment(day).format("dddd");
	}

	getImage(img: string) {
		return `${environment.apiImage}${img}@2x.png`;
	}
}
