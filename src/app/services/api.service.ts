import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { ModalService } from "./modal.service";
import { environment } from "../../environments/environment";
import * as moment from "moment";
import { Weather, WeatherService } from "../state";

@Injectable({
	providedIn: "root"
})
export class ApiService {
	filterdWeather: Weather[] = [];
	isLoading: boolean = false;

	constructor(
		private http: HttpClient,
		private modal: ModalService,
		private weather: WeatherService
	) {}

	sendWeatherHttpRequest(value: string): Observable<any> {
		return this.http.get<any>(
			`${environment.apiUrl}=${value}&units=metric&APPID=${environment.apiKey}`
		);
	}

	sendWeatherRequest(value: string): Observable<any> {
		return this.sendWeatherHttpRequest(value).pipe(
			map(result => {
				if (result.list.length > 0) {
					this.filterdWeather = result.list.map(date => {
						return {
							name: result.city.name,
							day: date.dt_txt,
							image: date.weather[0].icon,
							temp: date.main.temp,
							status: date.weather[0].description
						} as Weather;
					});

					this.filterdWeather = this.filterdWeather.filter((date, index) => {
						let dt = moment(date.day).format("LT");
						if (index !== 0) return dt === "12:00 AM";
						else return date;
					});
					this.weather.updateWeather(this.filterdWeather);
				}
			}),
			catchError(err =>
				of(this.modal.openModal(`${err.error.message}`, "Search"), this.weather.updateWeather([]))
			)
		);
	}
}
