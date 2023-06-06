import isEmpty from 'lodash/isEmpty';
import { IAstro, ICurrentWeather } from '../interface/home.interface';

interface IProps {
	weather: ICurrentWeather;
	astro: IAstro;
}

const Weather: React.FC<IProps> = (props) => {
	const { weather, astro } = props;
	const { location, current } = weather;
	return (
		<div className='weather-section'>
			{!isEmpty(weather) && (
				<>
					<div className='current-city mb--20'>
						<p className='font-size--xxl text--right text-decoration--italic current-date mb--20'>
							{new Date(location.localtime).toLocaleString()}
						</p>
						<p className='city-name font--extra-bold text--uppercase'>
							{location.name}
							<span className='font-size--xxl'>, {location.region}</span>
						</p>
					</div>

					<div className='current-weather flex align-items--center justify-content--between mb--20'>
						<div className='flex align-items--center'>
							<img className='condition-image' src={current.condition.icon} alt='icon' />
							<div className='flex align-items--end'>
								<p className='current-temp mr--10'>{weather.current.temp_c} &#8451;</p>
								<p className='current-condition font--medium'>{current.condition.text}</p>
							</div>
						</div>
						{!isEmpty(astro) && (
							<div>
								<p className='astro-title font--medium mb--5'>Sunrise : {astro.sunrise}</p>
								<p className='astro-title font--medium mb--5'>Sunset : {astro.sunset}</p>
								<p className='astro-title font--medium mb--5'>Moonrise : {astro.moonrise}</p>
								<p className='astro-title font--medium'>Moonset : {astro.moonset}</p>
							</div>
						)}
					</div>

					<div className='flex'>
						<p className='mr--20 font-size--xs'>
							Humidity : <span className='font--italic'>{weather.current.humidity}</span>
						</p>
						<p className='mr--20 font-size--xs'>
							Wind direction : <span className='font--italic'>{weather.current.wind_dir}</span>
						</p>
						<p className='mr--20 font-size--xs'>
							Wind speed : <span className='font--italic'>{weather.current.wind_kph} k/h</span>
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default Weather;
