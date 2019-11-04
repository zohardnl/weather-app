import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({
	providedIn: "root"
})
export class ModalService {
	constructor(private modalSnack: MatSnackBar) {}

	openModal(message: string, action?: string, position: MatSnackBarVerticalPosition = "bottom") {
		this.modalSnack.open(message, action, {
			duration: 3000,
			verticalPosition: position
		});
	}
}
