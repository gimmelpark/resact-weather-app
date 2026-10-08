import { getWeatherForecast } from '@/api/api';
import { Separator } from '@/components/ui/separator';
import type { ILocationDetails } from '@/models/geocoding';
import { useQuery } from '@tanstack/react-query';
import WeatherCurrent from './WeatherCurrent';

interface IProps {
  location: ILocationDetails;
}

function Weather({ location }: IProps) {
  const { data, isPending } = useQuery({
    queryKey: ['forecast', location.latitude, location.longitude],
    queryFn: getWeatherForecast,
  });

  return (
    <div className="border px-3 py-1">
      <span>
        Weather in {location.name}
        {location.country ? `, ${location.country}` : null}
      </span>

      <Separator className="mt-1" />

      {isPending ? <div>Loading...</div> : null}

      {data ? (
        <div>
          <WeatherCurrent
            weather={data.current}
            weatherUnits={data.current_units}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
