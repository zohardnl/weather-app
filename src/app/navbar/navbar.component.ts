import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, filter, switchMap, tap } from "rxjs/operators";
import { ApiService } from "../services/api.service";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
	@ViewChild("search", { static: false }) weatherSearch: FormControl;

	constructor(private api: ApiService) {}

	ngOnInit() {}

	ngAfterViewInit(): void {
		this.searchListener();
	}

	searchListener(): void {
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
