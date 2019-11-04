import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
	notNewMember: boolean = true;
	notMember: boolean = true;
	notLogin: boolean = true;
	message: string;
	isNewMemberSub: Subscription;
	isLoginSub: Subscription;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.isNewMemberSub = this.authService.getIsMemberListener().subscribe(res => {
			if (res) {
				this.notNewMember = false;
				this.message = "Signup success , please login!";
			} else {
				this.notMember = false;
				this.message = "You already signup!";
			}
		});

		this.isLoginSub = this.authService.getIsLoginListener().subscribe(res => {
			if (!res) {
				this.notLogin = false;
				this.message = "Your email or password incorrect";
			}
		});
	}

	onLogin(form: NgForm) {
		if (form.invalid) {
			return;
		}
		this.authService.login(form.value.email, form.value.password);
	}

	ngOnDestroy(): void {
		this.isNewMemberSub.unsubscribe();
		this.isLoginSub.unsubscribe();
	}
}
