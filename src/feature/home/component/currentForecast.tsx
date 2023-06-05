import { isEmpty } from 'lodash';
import { Fragment } from 'react';
import { IForecast, IHour } from '../interface/home.interface';
import Spinner from '../shared/spinner/spinner';

interface IProps {
	forecast: IForecast;
	loading: boolean;
}

const CurrentForecast: React.FC<IProps> = (props) => {
	const { forecast, loading } = props;
	return (
		<div className='current-forecast-section'>
			<p className='title font--extra-bold pl--10 mb--20'>Today Hourly Forecasts </p>
			{loading && <Spinner />}
			{!loading && !isEmpty(forecast) && (
				<div className='hour-forecast-wrapper flex overflow--hidden overflow--auto-x scrollbar--hidden'>
					{forecast.hour.map((item: IHour) => (
						<Fragment key={item.time}>
							<HourForecastCard item={item} />
						</Fragment>
					))}
				</div>
			)}
			{!loading && isEmpty(forecast) && (
				<p className='text--center font--medium mt--20'>No matching location found.</p>
			)}
		</div>
	);
};

interface IForecactCard {
	item: IHour;
}

const HourForecastCard: React.FC<IForecactCard> = (props) => {
	const { item } = props;
	return (
		<div className='hour-card flex flex--column align-items--center p--10'>
			<p>{new Date(item.time).toLocaleTimeString()}</p>
			<img className='condition-image' src={item.condition.icon} alt='icon' />
			<p className='mb--10'>{item.condition.text}</p>
			<p>{item.temp_c} &#8451;</p>
		</div>
	);
};

export default CurrentForecast;
