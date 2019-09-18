import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
	providedIn: "root"
})
export class ModalService {
	constructor(public openModal: MatSnackBar) {}
}
