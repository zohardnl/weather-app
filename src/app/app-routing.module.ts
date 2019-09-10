import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WeatherInfoComponent } from "./weather-info/weather-info.component";
import { FavoritesComponent } from "./favorites/favorites.component";

const routes: Routes = [
	{ path: "", component: WeatherInfoComponent },
	{ path: "favorites", component: FavoritesComponent },
	{ path: "**", redirectTo: "" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
