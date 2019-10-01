import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-addon",
	templateUrl: "./addon.component.html",
	styleUrls: ["./addon.component.scss"]
})
export class AddonComponent implements OnInit {
	text: string = "ADD TO FAVORITES";

	constructor() {}

	ngOnInit() {}
}
