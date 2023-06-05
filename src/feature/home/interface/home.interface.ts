export interface ICurrentWeather {
	location: ILocation;
	current: ICurrent;
}

export interface ILocation {
	name: string;
	region: string;
	country: string;
	lat: number;
	lon: number;
	tz_id: string;
	localtime_epoch: number;
	localtime: string;
}

export interface ICurrent {
	last_updated: string;
	temp_c: number;
	is_day: number;
	condition: ICondition;
	wind_kph: number;
	wind_degree: number;
	wind_dir: string;
	humidity: number;
	uv: number;
}

export interface IForecast {
	date: string;
	day: IDay;
	astro: IAstro;
	hour: IHour[];
}

export interface IDay {
	maxtemp_c: number;
	mintemp_c: number;
	avgtemp_c: number;
	maxwind_kph: number;
	totalsnow_cm: number;
	avghumidity: number;
	condition: ICondition;
}

export interface IAstro {
	sunrise: string;
	sunset: string;
	moonrise: string;
	moonset: string;
	moon_phase: string;
}

export interface IHour {
	time: string;
	temp_c: number;
	condition: ICondition;
	wind_kph: number;
	wind_degree: number;
	wind_dir: string;
	humidity: number;
	cloud: number;
}

export interface ICondition {
	text: string;
	icon: string;
	code: number;
}
