import { AfterContentInit, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../services/api.service";
import * as moment from "moment";

@Component({
	selector: "app-weather-info",
	templateUrl: "./weather-info.component.html",
	styleUrls: ["./weather-info.component.scss"]
})
export class WeatherInfoComponent implements OnInit, AfterContentInit {
	weather$: Observable<any[]> = this.api.weatherList$;
	weatherList: any[] = [];
	weatherDay: string;
	weather: object = {};

	constructor(private api: ApiService) {}

	ngOnInit() {}

	ngAfterContentInit(): void {
		this.weather$.subscribe(list => {
			console.log(list.slice(0, 4));
			this.weatherList = list.slice(0, 4);
		});
	}

	getWeather(): object {
		this.weatherDay = this.weatherList[0].dt_txt;
		this.weatherDay = moment(`${this.weatherDay}`).format("dddd");

		this.weather = {
			day: this.weatherDay,
			temp: this.weatherList[0].main.temp,
			image: `http://openweathermap.org/img/wn/${this.weatherList[0].weather[0].icon}@2x.png`,
			name: this.api.cityName,
			status: this.weatherList[0].weather[0].description
		};

		return this.weather;
	}
}
