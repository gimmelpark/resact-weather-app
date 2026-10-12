import type { IDailyWeatherUnits } from '@/models/forecast';
import WMOCodeImage from './WMOCodeImage';

interface IProps {
  date: string;
  weatherCode: number;
  tempMin: number;
  tempMax: number;
  units: IDailyWeatherUnits;
}

function WeatherDay({ date, weatherCode, tempMin, tempMax, units }: IProps) {
  // date-only strings ('YYYY-MM-DD') are parsed as UTC midnight,
  // so format in UTC too, otherwise negative UTC offsets show the previous day
  const dateString = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  });

  return (
    <div className="border rounded mt-2 flex items-center justify-between">
      <div className="ml-2 flex items-center">
        <WMOCodeImage code={weatherCode} isDay={true} />
        <div className="text-gray-500 font-mono my-1 ml-1">{dateString}</div>
      </div>

      <div className="mr-3">
        {`${Math.round(tempMin)} - ${Math.round(tempMax)}${units.temperature_2m_max}`}
      </div>
    </div>
  );
}

export default WeatherDay;
