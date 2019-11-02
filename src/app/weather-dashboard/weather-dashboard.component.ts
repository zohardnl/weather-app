import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../state";

@Component({
	selector: "app-weather-dashboard",
	templateUrl: "./weather-dashboard.component.html",
	styleUrls: ["./weather-dashboard.component.scss"]
})
export class WeatherDashboardComponent implements OnInit {
	isLoading: boolean;

	constructor(private weatherService: WeatherService) {}

	ngOnInit() {
		this.weatherService.getLoading().subscribe(load => {
			this.isLoading = load;
		});
	}
}
