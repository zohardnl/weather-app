import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { autoComplete, WeatherService } from "../../state";
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";

@Component({
	selector: "app-weather-search",
	templateUrl: "./weather-search.component.html",
	styleUrls: ["./weather-search.component.scss"]
})
export class WeatherSearchComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild("search", { static: false }) weatherSearch: FormControl;
	searchValid: boolean;
	filteredOptions: autoComplete[] = [];
	private searchValidSub: Subscription;
	private autoCompleteSub: Subscription;

	constructor(private weather: WeatherService, private route: Router, private api: ApiService) {
		this.searchValidSub = this.weather.getValidSearch().subscribe(res => {
			this.searchValid = res;
		});
	}

	ngOnInit() {
		this.autoCompleteSub = this.weather.getAutoComplete().subscribe(res => {
			this.filteredOptions = res;
		});
	}

	ngAfterViewInit(): void {
		if (this.searchValid && this.weatherSearch) {
			this.searchListener();
		}
	}

	searchListener() {
		// empty query stream handler, reset the weather when the query is empty or invalid.
		this.weatherSearch.valueChanges
			.pipe(
				filter(value => (value !== null && value.length === 0) || this.weatherSearch.invalid),
				tap(() => {
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
			.subscribe(() => {
				this.weather.setLoading(false);
				this.route.navigate(["weather"]);
			});
	}

	getSearch(key: number, city: string) {
		this.weather.setLoading(false);
		this.api.getForecast(key).subscribe();
		this.api.getWeatherByKey(key, city).subscribe();
	}

	clearValue() {
		this.weatherSearch.reset("");
		this.weather.updateWeather([]);
		this.weather.updateAutoComplete([]);
		this.weather.updateCurrent(null);
	}

	ngOnDestroy() {
		this.searchValidSub.unsubscribe();
		this.autoCompleteSub.unsubscribe();
	}
}
