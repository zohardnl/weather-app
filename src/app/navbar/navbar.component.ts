import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, filter, switchMap, tap } from "rxjs/operators";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";
import { WeatherService } from "../state";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy {
	@ViewChild("search", { static: false }) weatherSearch: FormControl;
	userIsAuthenticated: boolean;
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

	ngOnInit() {}

	searchListener(): void {
		// empty query stream handler, reset the weather when the query is empty or invalid.
		this.weatherSearch.valueChanges
			.pipe(
				filter(value => value.length === 0 || this.weatherSearch.invalid),
				tap(() => {
					this.weather.updateWeather([]);
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
				switchMap(value => this.api.sendWeatherRequest(value))
			)
			.subscribe(() => {
				this.weather.setLoading(false);
				this.route.navigate(["weather"]);
			});
	}

	changeRoute() {
		if (this.route.url === "/favorites") this.route.navigate(["/weather"]);
		else this.route.navigate(["/favorites"]);
	}

	onLogout() {
		this.authService.logout();
	}

	ngOnDestroy() {
		this.authListenerSubs.unsubscribe();
	}
}
