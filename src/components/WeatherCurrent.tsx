import type { ICurrentWeather, ICurrentWeatherUnits } from '@/models/forecast';
import WMOCodeImage from './WMOCodeImage';

interface IProps {
  weather: ICurrentWeather;
  weatherUnits: ICurrentWeatherUnits;
}

function WeatherCurrent({ weather, weatherUnits }: IProps) {
  return (
    <div>
      <div className="flex flex-col items-center mt-2">
        <div className="flex items-center">
          <WMOCodeImage
            code={weather.weather_code}
            isDay={!!weather.is_day}
            size={64}
          />
          <div>
            <div className="text-2xl font-bold text-gray-600">
              {Math.round(weather.temperature_2m)}
              {weatherUnits.temperature_2m}
            </div>

            <div className="text-gray-500">
              Feels like {Math.round(weather.apparent_temperature)}
              {weatherUnits.apparent_temperature}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCurrent;
