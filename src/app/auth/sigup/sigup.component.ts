import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-sigup",
	templateUrl: "./sigup.component.html",
	styleUrls: ["./sigup.component.scss"]
})
export class SigupComponent implements OnInit {
	constructor(public authService: AuthService, private router: Router) {}

	ngOnInit() {}

	onSignup(form: NgForm) {
		if (form.invalid) {
			return;
		}
		this.authService.createUser(form.value.email, form.value.password);
		this.router.navigate(["login"]);
	}
}
