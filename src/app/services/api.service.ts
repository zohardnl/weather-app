import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class ApiService {
	private _list: BehaviorSubject<any[]> = new BehaviorSubject([]);
	weatherList$: Observable<any[]> = this._list.asObservable();
	isLoading: boolean = false;
	cityName: string;

	constructor(private http: HttpClient) {}

	sendWeatherHttpRequest(value: string): Observable<any> {
		return this.http.get<any>(
			`http://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&APPID=e7680cb86def334be135f12d742a5ce4`
		);
	}

	sendWeatherRequest(value: string): any {
		return this.sendWeatherHttpRequest(value).pipe(
			map(result => {
				this._list.next(result.list);
			}),
			catchError(err => of(alert(err.error.message)))
		);
	}
}
