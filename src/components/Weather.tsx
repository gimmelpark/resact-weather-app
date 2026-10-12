import { forecastOptions } from '@/api/api';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { getWMODescriptionByCode } from '@/helpers/wmoDescription';
import type { ICoordinates, ILocationDetails } from '@/models/geocoding';
import { useQuery } from '@tanstack/react-query';
import { RotateCcw } from 'lucide-react';
import WeatherCurrent from './WeatherCurrent';
import WeatherDay from './WeatherDay';

interface IProps {
  location: ILocationDetails | null;
  locationCoords: ICoordinates;
}

function Weather({ location, locationCoords }: IProps) {
  const { data, isPending, refetch } = useQuery({
    ...forecastOptions(locationCoords.latitude, locationCoords.longitude),
    refetchInterval: 10 * 60 * 1000,
  });

  const titleString = location
    ? `${location.name}${location.country ? ', ' + location.country : ''}`
    : `${locationCoords.latitude}, ${locationCoords.longitude}`;

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

  const leftTitleContent =
    !data && !isPending ? (
      <div className="text-red-600">Cannot get forecast</div>
    ) : (
      <div>{titleString}</div>
    );

  const rightTitleContent = data ? (
    <div className="text-gray-500">{currentWeatherDescription}</div>
  ) : isPending ? (
    <Spinner />
  ) : (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label="Refetch"
      title="Refetch"
      className="cursor-pointer"
      onClick={() => refetch()}
    >
      <RotateCcw className="text-red-600" />
    </Button>
  );

  return (
    <div className="border rounded px-3 py-1 mb-6">
      <div className="flex justify-between items-center">
        {leftTitleContent}

        {rightTitleContent}
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
