import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		let authRequest;
		if (
			req.url.includes(`${environment.userUrl}`) ||
			req.url.includes(`${environment.weatherUrl}`)
		) {
			const authToken = this.authService.getToken();
			authRequest = req.clone({
				headers: req.headers.set("Authorization", "Bearer " + authToken)
			});
			return next.handle(authRequest);
		} else {
			authRequest = req.clone();
			return next.handle(authRequest);
		}
	}
}
