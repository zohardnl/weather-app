import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WeatherInfoComponent } from "./weather-info/weather-info.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { LoginComponent } from "./auth/login/login.component";
import { SigupComponent } from "./auth/sigup/sigup.component";
import { AuthGuard } from "./auth/auth.guard";
import { AppComponent } from "./app.component";

const routes: Routes = [
	{ path: "weather", component: WeatherInfoComponent, canActivate: [AuthGuard] },
	{ path: "signup", component: SigupComponent },
	{ path: "login", component: LoginComponent },
	{ path: "favorites", component: FavoritesComponent, canActivate: [AuthGuard] },
	{ path: "**", redirectTo: "" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
	providers: [AuthGuard]
})
export class AppRoutingModule {}
