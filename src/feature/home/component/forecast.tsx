import { isEmpty } from 'lodash';
import { Fragment } from 'react';
import { IDay, IForecast } from '../interface/home.interface';
import Spinner from '../shared/spinner/spinner';

interface IProps {
	setSearchCity: (value: string) => void;
	handleSearch: () => void;
	loading: boolean;
	forecast: IForecast[];
}

const Forecast: React.FC<IProps> = (props) => {
	const { setSearchCity, handleSearch, loading, forecast } = props;
	return (
		<>
			<div className='forecast-section'>
				<div className='search-wrapper flex flex--column align-items--center justify-content--center mb--40'>
					<input
						className='input text--white'
						placeholder='Enter city'
						autoComplete='on'
						type='text'
						onChange={({ target }) => setSearchCity(target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleSearch();
							}
						}}
					/>
					<button disabled={loading} className='button' onClick={() => handleSearch()}>
						Search
					</button>
				</div>
				<div className='forecast-wrapper'>
					<p className='title font--extra-bold pl--10'>Next 7-Day Forecasts </p>
					{loading && <Spinner />}
					{!loading &&
						!isEmpty(forecast) &&
						forecast.map((item: IForecast) => (
							<Fragment key={item.date}>
								<ForecastCard date={item.date} day={item.day} />
							</Fragment>
						))}
					{!loading && isEmpty(forecast) && (
						<p className='text--center font--medium mt--20'>No matching location found.</p>
					)}
				</div>
			</div>
		</>
	);
};

interface IForecactCard {
	date: string;
	day: IDay;
}

const ForecastCard: React.FC<IForecactCard> = (props) => {
	const { date, day } = props;
	const { condition } = day;
	return (
		<div className='forecast-card flex align-items--center justify-content--between p--10'>
			<div className='flex align-items--center'>
				<img className='condition-image' src={condition.icon} alt='icon' />
				<div className='ml--10'>
					<p className='forecast-date font-size--sm mb--5'>{new Date(date).toDateString()}</p>
					<p className='forecast-condition font--semi-bold font-size--lg'>{condition.text}</p>
				</div>
			</div>
			<div className='ml--10'>
				<p className='forecast-min font-size--sm mb--5'>Min temp : {day.mintemp_c}&#8451;</p>
				<p className='forecast-max font-size--sm '>Max temp : {day.maxtemp_c}&#8451;</p>
			</div>
		</div>
	);
};

export default Forecast;
