import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Subject } from "rxjs";
import { ModalService } from "./modal.service";
import { environment } from "../../environments/environment";
import { autoComplete, Weather, WeatherService } from "../state";

@Injectable({
	providedIn: "root"
})
export class ApiService {
	filterdWeather: Weather[] = [];
	favoriteWeather: Weather[] = [];
	acArr: autoComplete[];
	private favWeather = new Subject<Weather[]>();

	constructor(
		private http: HttpClient,
		private modal: ModalService,
		private weather: WeatherService
	) {}

	getWeatherHttpByKey(val: number) {
		return this.http.get<any>(`${environment.apiDaily}/${val}?apikey=${environment.apiKey}`);
	}

	getWeatherByKey(val: number, city: string) {
		return this.getWeatherHttpByKey(val).pipe(
			map(res => {
				return {
					name: city,
					day: "Now",
					key: val,
					image: res[0].WeatherIcon,
					temp: res[0].Temperature.Metric.Value,
					status: res[0].WeatherText
				} as Weather;
			}),
			tap(res => {
				this.weather.updateCurrent(res);
			})
		);
	}

	getForecastHttp(value: number) {
		return this.http.get<any>(
			`${environment.apiForecast}/${value}?apikey=${environment.apiKey}&metric=true`
		);
	}

	getForecast(value: number) {
		return this.getForecastHttp(value).pipe(
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

	getAutoCompleteHttpSearch(value: string) {
		return this.http.get<any>(
			`${environment.apiAutoComplete}?apikey=${environment.apiKey}&q=${value}`
		);
	}

	getAutoCompleteSearch(value: string) {
		return this.getAutoCompleteHttpSearch(value).pipe(
			map(result => {
				if (result.length > 0) {
					this.acArr = result.map(val => {
						return {
							city: val.LocalizedName,
							country: val.Country.LocalizedName,
							key: val.Key
						} as autoComplete;
					});
				} else {
					this.modal.openModal("No Results for this search!", "Search");
					this.acArr = [];
				}
				this.weather.updateAutoComplete(this.acArr);
			})
		);
	}

	updateDbFav(item: Weather) {
		const weatherItem: Weather = {
			name: item.name,
			key: item.key,
			day: item.day,
			image: item.image,
			temp: item.temp,
			status: item.status
		};

		this.http.post<any>(`${environment.weatherUrl}`, weatherItem).subscribe(result => {
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
							key: item.key,
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
		this.http.delete<any>(`${environment.weatherUrl}/` + itemId).subscribe(() => {
			this.favoriteWeather = this.favoriteWeather.filter(val => val.backId !== itemId);
			this.favWeather.next([...this.favoriteWeather]);
		});
	}
}
