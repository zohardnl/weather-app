import { Component, OnDestroy, OnInit } from "@angular/core";
import { WeatherService } from "../state";
import { Subscription } from "rxjs";

@Component({
	selector: "app-weather-dashboard",
	templateUrl: "./weather-dashboard.component.html",
	styleUrls: ["./weather-dashboard.component.scss"]
})
export class WeatherDashboardComponent implements OnInit, OnDestroy {
	isLoading: boolean;
	private loadingSub: Subscription;

	constructor(private weatherService: WeatherService) {}

	ngOnInit() {
		this.loadingSub = this.weatherService.getLoading().subscribe(load => {
			this.isLoading = load;
		});
	}

	ngOnDestroy(): void {
		this.loadingSub.unsubscribe();
	}
}
