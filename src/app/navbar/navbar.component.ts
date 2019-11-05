import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
	@ViewChild("slider", { static: false }) slider: HTMLInputElement;

	userIsAuthenticated: boolean;
	private authListenerSubs: Subscription;

	constructor(
		private api: ApiService,
		private route: Router,
		private weather: WeatherService,
		private authService: AuthService
	) {
		this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
			this.userIsAuthenticated = isAuthenticated;
		});
	}

	ngOnInit() {}

	changeRoute() {
		if (this.slider.checked) {
			this.route.navigate(["/favorites"]);
		} else {
			this.route.navigate(["/weather"]);
		}
	}

	onLogout() {
		this.authService.logout();
	}

	ngOnDestroy() {
		this.authListenerSubs.unsubscribe();
	}
}
