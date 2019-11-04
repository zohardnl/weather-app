import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";
import { ModalService } from "../../services/modal.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
	isNewMemberSub: Subscription;
	isLoginSub: Subscription;

	constructor(private authService: AuthService, private modal: ModalService) {}

	ngOnInit() {
		this.isNewMemberSub = this.authService.getIsMemberListener().subscribe(res => {
			if (res) {
				this.modal.openModal("Signup success , please login!", "Signup");
			} else {
				this.modal.openModal("You already signup!", "Signup");
			}
		});

		this.isLoginSub = this.authService.getIsLoginListener().subscribe(res => {
			if (!res) {
				this.modal.openModal("Your email or password incorrect", "Login");
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
