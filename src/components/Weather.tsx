import { getWeatherForecast } from '@/api/api';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { getWMODescriptionByCode } from '@/helpers/wmo_description';
import type { ILocationDetails } from '@/models/geocoding';
import { useQuery } from '@tanstack/react-query';
import WeatherCurrent from './WeatherCurrent';
import WeatherDay from './WeatherDay';

interface IProps {
  location: ILocationDetails;
}

function Weather({ location }: IProps) {
  const { data } = useQuery({
    queryKey: ['forecast', location.latitude, location.longitude],
    queryFn: getWeatherForecast,
  });

  const weekWeatherData =
    data?.daily.time.map((date, i) => {
      return {
        date,
        weatherCode: data.daily.weather_code[i],
        tempMin: data.daily.temperature_2m_min[i],
        tempMax: data.daily.temperature_2m_max[i],
      };
    }) ?? [];

  const currentWeatherDescription = data
    ? getWMODescriptionByCode(data.current.weather_code, !!data.current.is_day)
    : null;

  return (
    <div className="border rounded px-3 py-1 mb-6">
      <div className="flex justify-between items-center">
        <div>
          Weather in {location.name}
          {location.country ? `, ${location.country}` : null}
        </div>

        {data ? (
          <div className="text-gray-500">{currentWeatherDescription}</div>
        ) : (
          <Spinner />
        )}
      </div>

      {data ? (
        <>
          <Separator className="mt-1" />

          <WeatherCurrent
            weather={data.current}
            weatherUnits={data.current_units}
          />

          <div className="mb-2">
            {weekWeatherData.map(({ date, weatherCode, tempMin, tempMax }) => (
              <WeatherDay
                key={date}
                date={date}
                weatherCode={weatherCode}
                tempMin={tempMin}
                tempMax={tempMax}
                units={data.daily_units}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Weather;
