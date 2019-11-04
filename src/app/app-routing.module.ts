import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FavoritesComponent } from "./favorites/favorites.component";
import { LoginComponent } from "./auth/login/login.component";
import { SigupComponent } from "./auth/sigup/sigup.component";
import { AuthGuard } from "./auth/auth.guard";
import { WeatherDashboardComponent } from "./weather-dashboard/weather-dashboard.component";

const routes: Routes = [
	{ path: "", component: WeatherDashboardComponent, canActivate: [AuthGuard] },
	{ path: "weather", component: WeatherDashboardComponent, canActivate: [AuthGuard] },
	{ path: "signup", component: SigupComponent },
	{ path: "login", component: LoginComponent },
	{ path: "favorites", component: FavoritesComponent, canActivate: [AuthGuard] },
	{ path: "**", redirectTo: "" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard]
})
export class AppRoutingModule {}
