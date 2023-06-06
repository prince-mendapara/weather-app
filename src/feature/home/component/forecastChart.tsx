import { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import {
	Chart,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
	Filler,
	TooltipItem
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IForecast } from '../interface/home.interface';
import Spinner from '../shared/spinner/spinner';

interface IProps {
	forecast: IForecast[];
	loading: boolean;
}

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ForecastChart: React.FC<IProps> = (props) => {
	const { forecast, loading } = props;

	const chartDataSets = useMemo(() => {
		const tempArr = forecast.map((item) => {
			return {
				label: new Date(item.date).toDateString(),
				data: item?.hour.map((item) => item.temp_c),
				pointBackgroundColor: '#ffffff',
				pointHitRadius: 2,
				pointBorderWidth: 2,
				pointRadius: 3,
				pointHoverBackgroundColor: '#ffffff',
				pointHoverBorderWidth: 4,
				pointHoverRadius: 4,
				borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
			};
		});
		return tempArr;
	}, [forecast]);

	const data: ChartData<'line'> = {
		labels: forecast[0]?.hour.map((item) => new Date(item.time).toLocaleTimeString()),
		datasets: chartDataSets
	};

	const options: ChartOptions<'line'> = {
		scales: {
			y: {
				grid: {
					display: false
				}
			}
		},
		responsive: true,
		aspectRatio: 0,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				labels: {
					boxHeight: 10,
					boxWidth: 10,
					padding: 15,
					usePointStyle: true,
					color: '#ffffff',
					font: {
						size: 18,
						lineHeight: 18,
						weight: '400',
						family: 'Poppins'
					}
				}
			},
			tooltip: {
				enabled: true,
				position: 'average',
				displayColors: false,
				titleAlign: 'center',
				callbacks: {
					label: (tooltipItem: TooltipItem<'line'>) => {
						const label = tooltipItem.dataset.label;
						const value = tooltipItem.dataset.data[tooltipItem.dataIndex];
						return `${label}: ${value} c`;
					}
				}
			}
		}
	};

	return (
		<div className='forecast-chart-section'>
			<p className='title font--extra-bold pl--10 mb--20'>7-Day Hourly Forecasts Analysis</p>
			{loading && <Spinner />}
			{!loading && !isEmpty(forecast) && (
				<div className='chart_wrapper'>
					<div className='line-chart'>
						<Line data={data} options={options} />
					</div>
				</div>
			)}
			{!loading && isEmpty(forecast) && (
				<p className='text--center font--medium mt--20'>No matching location found.</p>
			)}
		</div>
	);
};

export default ForecastChart;
