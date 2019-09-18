export class Weather {
	name: string;
	day: string;
	image: string;
	temp: number;
	status: string;

	constructor(name: string, day: string, temp: number, status: string, image?: string) {
		this.name = name;
		this.day = day;
		this.image = image;
		this.temp = temp;
		this.status = status;
	}
}
