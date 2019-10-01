import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
	providedIn: "root"
})
export class ModalService {
	constructor(public modalSnack: MatSnackBar) {}

	openModal(message: string, action?: string) {
		this.modalSnack.open(message, action, {
			duration: 3000,
			verticalPosition: "bottom"
		});
	}
}
