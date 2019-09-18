import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, filter, switchMap, tap } from "rxjs/operators";
import { ApiService } from "../services/api.service";
import { Store } from "@ngrx/store";
import * as fromWeather from "../weather-info/store/weather.reducer";
import * as SearchWeatherActions from "../weather-info/store/weather.actions";
import { Router } from "@angular/router";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
	@ViewChild("search", { static: false }) weatherSearch: FormControl;

	constructor(
		private api: ApiService,
		private store: Store<fromWeather.AppState>,
		private route: Router
	) {}

	ngOnInit() {}

	ngAfterViewInit(): void {
		this.searchListener();
	}

	isFavorite() {
		return this.route.url === "/favorites";
	}

	searchListener(): void {
		// empty query stream handler, reset the weather when the query is empty.
		this.weatherSearch.valueChanges
			.pipe(
				filter(value => value.length === 0 || this.weatherSearch.invalid),
				tap(() => {
					this.store.dispatch(new SearchWeatherActions.CleanWeather([]));
					this.api.isLoading = false;
				})
			)
			.subscribe();

		// search weather stream handler;
		this.weatherSearch.valueChanges
			.pipe(
				filter(value => value && value.length >= 2 && this.weatherSearch.valid),
				tap(() => {
					this.api.isLoading = true;
					this.api.cityName = this.weatherSearch.value;
				}),
				debounceTime(3000),
				switchMap(value => this.api.sendWeatherRequest(value))
			)
			.subscribe(() => (this.api.isLoading = false));
	}
}
