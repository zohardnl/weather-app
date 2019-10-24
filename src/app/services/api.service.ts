import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { ModalService } from "./modal.service";
import { environment } from "../../environments/environment";
import * as moment from "moment";
import { autoComplete, Weather, WeatherService } from "../state";

@Injectable({
	providedIn: "root"
})
export class ApiService {
	filterdWeather: Weather[] = [];
	favoriteWeather: Weather[] = [];
	acArr: autoComplete[];
	private autoComplete = new BehaviorSubject<autoComplete[]>([]);
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

	getWeatherHttpByKey() {
		// return this.http.get(
		// 	`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=Kc8D929PB5lrFWDQM9Wivqydivv8BL3z&metric=true`
		// );

		return this.http.get<any>("http://localhost:3000/api/weather/daily");
	}

	getWeatherByKey() {
		return this.getWeatherHttpByKey();
	}

	getForecastHttp() {
		return this.http.get<any>("http://localhost:3000/api/weather/forecast");
	}

	getForecast() {
		return this.getForecastHttp().pipe(
			map(res => {
				if (res.DailyForecasts.length > 0) {
					this.filterdWeather = res.DailyForecasts.map(val => {
						return {
							day: val.Date,
							image: val.Day.Icon,
							temp: val.Temperature.Minimum.Value,
							status: val.Day.IconPhrase
						} as Weather;
					});
					this.weather.updateWeather(this.filterdWeather);
				}
			})
		);
	}

	getAutoCompleteHttpSearch() {
		// return this.http.get<any>(
		// 	`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=Kc8D929PB5lrFWDQM9Wivqydivv8BL3z&q=${value}`
		// );

		return this.http.get<any>("http://localhost:3000/api/weather/auto");
	}

	getAutoCompleteSearch() {
		return this.getAutoCompleteHttpSearch().pipe(
			map(result => {
				if (result.length > 0) {
					this.acArr = result.map(val => {
						return {
							city: val.LocalizedName,
							country: val.Country.LocalizedName,
							key: val.Key
						} as autoComplete;
					});
				}
				this.autoComplete.next(this.acArr);
			}),
			catchError(() =>
				of(
					this.modal.openModal("No Results for this search!", "Search"),
					this.autoComplete.next([])
				)
			)
		);
	}

	getAutoComplete() {
		return this.autoComplete.asObservable();
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
		this.http.post<any>(`${environment.weatherUrl}`, item).subscribe(result => {
			weatherItem.backId = result.weatherId;
			this.favoriteWeather.push(weatherItem);
			this.favWeather.next([...this.favoriteWeather]);
		});
	}

	getWeather() {
		this.http
			.get<any>(`${environment.weatherUrl}`)
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

	getFavWeatherListener() {
		return this.favWeather.asObservable();
	}

	removeFav(itemId: string) {
		this.http.delete(`${environment.weatherUrl}/` + itemId).subscribe(() => {
			this.favoriteWeather = this.favoriteWeather.filter(val => val.backId !== itemId);
			this.favWeather.next([...this.favoriteWeather]);
		});
	}
}
