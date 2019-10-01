export interface Weather {
	name: string;
	day: string;
	image: string;
	temp: number;
	status: string;
}

export function createWeather(params: Partial<Weather>) {
	return {} as Weather;
}
