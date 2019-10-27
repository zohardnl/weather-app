import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";
import { autoComplete, WeatherService } from "../state";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from "rxjs/operators";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild("search", { static: false }) weatherSearch: FormControl;
	userIsAuthenticated: boolean;
	filteredOptions: autoComplete[] = [];
	private authListenerSubs: Subscription;

	constructor(
		private api: ApiService,
		private route: Router,
		private weather: WeatherService,
		public authService: AuthService
	) {
		this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
			this.userIsAuthenticated = isAuthenticated;
		});
	}

	ngOnInit() {
		this.api.getAutoComplete().subscribe(res => {
			this.filteredOptions = res;
		});
	}

	ngAfterViewInit() {
		this.searchListener();
	}

	searchListener() {
		// empty query stream handler, reset the weather when the query is empty or invalid.
		this.weatherSearch.valueChanges
			.pipe(
				filter(value => (value !== null && value.length === 0) || this.weatherSearch.invalid),
				tap(() => {
					this.weather.updateWeather([]);
					this.filteredOptions = [];
					this.weather.setLoading(false);
				})
			)
			.subscribe();

		// search weather stream handler;
		this.weatherSearch.valueChanges
			.pipe(
				filter(value => value && value.length >= 2 && this.weatherSearch.valid),
				tap(() => {
					this.weather.setLoading(true);
				}),
				debounceTime(3000),
				distinctUntilChanged(),
				switchMap(value => this.api.getAutoCompleteSearch(value))
			)
			.subscribe(res => {
				this.weather.setLoading(false);
				this.route.navigate(["weather"]);
			});
	}

	getSearch(key: number) {
		this.api.getForecast(key).subscribe();
		this.api.getWeatherByKey(key).subscribe();
	}

	changeRoute() {
		if (this.route.url === "/favorites") this.route.navigate(["/weather"]);
		else this.route.navigate(["/favorites"]);
	}

	clearValue() {
		this.weatherSearch.reset("");
		this.weather.updateWeather([]);
	}

	onLogout() {
		this.authService.logout();
	}

	ngOnDestroy() {
		this.authListenerSubs.unsubscribe();
	}
}
