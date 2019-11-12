import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild("slider", { static: false }) slider: HTMLInputElement;
	sliderStatus: boolean;
	userIsAuthenticated: boolean;
	private authListenerSubs: Subscription;
	private sliderStatusSub: Subscription;

	constructor(
		private api: ApiService,
		private route: Router,
		private weather: WeatherService,
		private authService: AuthService
	) {
		this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
			this.userIsAuthenticated = isAuthenticated;
		});

		this.sliderStatusSub = this.weather.getSliderStatus().subscribe(val => {
			this.sliderStatus = val;
		});
	}

	ngOnInit() {}

	ngAfterViewInit(): void {
		let url = window.location.pathname;
		if (url === "/weather") {
			this.sliderStatus = false;
		} else if (url === "/favorites") {
			this.sliderStatus = true;
		}
	}

	changeRoute() {
		if (this.slider.checked) {
			this.sliderStatus = true;
			this.route.navigate(["/favorites"]);
		} else {
			this.sliderStatus = false;
			this.route.navigate(["/weather"]);
		}
	}

	onLogout() {
		this.authService.logout();
	}

	ngOnDestroy() {
		this.authListenerSubs.unsubscribe();
		this.sliderStatusSub.unsubscribe();
	}
}
