import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { ModalService } from "./modal.service";
import { Store } from "@ngrx/store";
import * as SearchWeatherActions from "../weather-info/store/weather.actions";
import * as fromWeather from "../weather-info/store/weather.reducer";
import { environment } from "../../environments/environment";
import * as moment from "moment";

@Injectable({
	providedIn: "root"
})
export class ApiService {
	filterdWeather: any[] = [];
	weather;
	isLoading: boolean = false;
	cityName: string;

	constructor(
		private http: HttpClient,
		private modal: ModalService,
		private store: Store<fromWeather.AppState>
	) {}

	sendWeatherHttpRequest(value: string): Observable<any> {
		return this.http.get<any[]>(
			`${environment.apiUrl}=${value}&units=metric&APPID=${environment.apiKey}`
		);
	}

	sendWeatherRequest(value: string): Observable<any> {
		return this.sendWeatherHttpRequest(value).pipe(
			map(result => {
				// if (result.list.length >= 1) {
				this.filterdWeather = result.list.filter(date => {
					let dt = moment(date.dt_txt).format("LT");
					return dt === "12:00 AM";
				});
				this.store.dispatch(new SearchWeatherActions.SearchWeather(this.filterdWeather));
				// }
			}),
			catchError(err =>
				of(
					this.openModal(`${err.error.message}`, "Search"),
					this.store.dispatch(new SearchWeatherActions.CleanWeather([]))
				)
			)
		);
	}

	// clearWeather() {}

	openModal(message: string, action: string) {
		this.modal.openModal.open(message, action, {
			duration: 3000,
			verticalPosition: "top"
		});
	}
}
