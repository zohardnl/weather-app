import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, of, Subject } from "rxjs";
import { ModalService } from "./modal.service";
import { environment } from "../../environments/environment";
import * as moment from "moment";
import { Weather, WeatherService } from "../state";

@Injectable({
	providedIn: "root"
})
export class ApiService {
	filterdWeather: Weather[] = [];
	favoriteWeather: Weather[] = [];
	private favWeather = new Subject<Weather[]>();

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

	updateDbFav(item: Weather) {
		const weatherItem: Weather = {
			backId: "",
			name: item.name,
			day: item.day,
			image: item.image,
			temp: item.temp,
			status: item.status
		};
		this.http.post<any>("http://localhost:3000/api/weather", item).subscribe(result => {
			weatherItem.backId = result.weatherId;
			this.favoriteWeather.push(weatherItem);
			this.favWeather.next([...this.favoriteWeather]);
		});
	}

	getWeather() {
		this.http
			.get<any>("http://localhost:3000/api/weather")
			.pipe(
				map(weatherData => {
					return weatherData.weather.map(item => {
						return {
							backId: item._id,
							name: item.name,
							day: item.day,
							image: item.image,
							temp: item.temp,
							status: item.status
						};
					});
				})
			)
			.subscribe(result => {
				this.favoriteWeather = result;
				this.favWeather.next([...this.favoriteWeather]);
			});
	}

	getWeatherListener() {
		return this.favWeather.asObservable();
	}

	removeFav(itemId: string) {
		this.http.delete("http://localhost:3000/api/weather/" + itemId).subscribe(() => {
			this.favoriteWeather = this.favoriteWeather.filter(val => val.backId !== itemId);
			this.favWeather.next([...this.favoriteWeather]);
		});
	}
}
