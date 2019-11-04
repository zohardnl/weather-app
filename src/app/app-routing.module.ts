import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FavoritesComponent } from "./favorites/favorites.component";
import { LoginComponent } from "./auth/login/login.component";
import { SigupComponent } from "./auth/sigup/sigup.component";
import { AuthGuard } from "./auth/auth.guard";
import { WeatherDashboardComponent } from "./weather-dashboard/weather-dashboard.component";
import { LoginGuard } from "./auth/login.guard";

const routes: Routes = [
	{ path: "", component: WeatherDashboardComponent, canActivate: [AuthGuard] },
	{ path: "weather", component: WeatherDashboardComponent, canActivate: [AuthGuard] },
	{ path: "signup", component: SigupComponent, canActivate: [LoginGuard] },
	{ path: "login", component: LoginComponent, canActivate: [LoginGuard] },
	{ path: "favorites", component: FavoritesComponent, canActivate: [AuthGuard] },
	{ path: "**", redirectTo: "" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard, LoginGuard]
})
export class AppRoutingModule {}
