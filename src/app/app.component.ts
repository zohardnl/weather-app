import { Component, OnInit } from "@angular/core";
import { WeatherService } from "./state";
import { AuthService } from "./auth/auth.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	isLoading: boolean;

	constructor(private weatherService: WeatherService, private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.autoAuthUser();
		this.weatherService.getLoading().subscribe(load => {
			this.isLoading = load;
		});
	}
}
