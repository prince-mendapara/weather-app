import { useCallback, useEffect, useState } from 'react';
import CurrentForecast from '../component/currentForecast';
import Forecast from '../component/forecast';
import ForecastChart from '../component/forecastChart';
import Weather from '../component/weather';
import { ICurrentWeather, IForecast } from '../interface/home.interface';

const Home: React.FC = () => {
	const [searchCity, setSearchCity] = useState<string>('');
	const [actionLoading, setActionLoading] = useState<boolean>(false);
	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>({} as ICurrentWeather);
	const [weatherForecast, setWeatherForecast] = useState<IForecast[]>([]);

	const fetchWeather = useCallback(
		async (city = 'ahmedabad') => {
			try {
				setActionLoading(true);
				const response = await fetch(
					`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&days=7&q=${city}`
				);
				const data = await response.json();
				setCurrentWeather({ location: { ...data.location }, current: { ...data.current } });
				setWeatherForecast([...data.forecast.forecastday]);
				setActionLoading(false);
			} catch (error) {
				setCurrentWeather(currentWeather);
				setWeatherForecast([]);
				setActionLoading(false);
			}
		},
		[currentWeather]
	);

	useEffect(() => {
		fetchWeather();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className='main-app'>
			<div className='container'>
				<div className='page-wrapper'>
					<div className='main-section'>
						<Weather weather={currentWeather} astro={weatherForecast[0]?.astro} />
						<CurrentForecast loading={actionLoading} forecast={weatherForecast[0]} />
						<ForecastChart loading={actionLoading} forecast={weatherForecast} />
					</div>
					<Forecast
						loading={actionLoading}
						forecast={weatherForecast}
						setSearchCity={(value) => setSearchCity(value)}
						handleSearch={() => fetchWeather(searchCity || 'ahmedabad')}
					/>
				</div>
			</div>
		</section>
	);
};

export default Home;
