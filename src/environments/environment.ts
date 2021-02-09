// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	apiForecast: "https://dataservice.accuweather.com/forecasts/v1/daily/5day",
	apiDaily: "https://dataservice.accuweather.com/currentconditions/v1",
	apiKey: "Kc8D929PB5lrFWDQM9Wivqydivv8BL3z",
	apiImage: "https://developer.accuweather.com/sites/default/files",
	weatherUrl: "http://localhost:3000/api/weather",
	userUrl: "http://localhost:3000/api/user",
	apiAutoComplete: "https://dataservice.accuweather.com/locations/v1/cities/autocomplete"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
