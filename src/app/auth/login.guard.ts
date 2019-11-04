import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class LoginGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		let isAuth = this.authService.getIsAuth();
		if (isAuth) {
			isAuth = false;
			this.router.navigate(["weather"]);
		} else {
			isAuth = true;
		}
		return isAuth;
	}
}
