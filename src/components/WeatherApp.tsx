import { getLoacationByName } from '@/api/api';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LocationSearch from './LocationSearch';

function WeatherApp() {
  const [locationString, setLocationString] = useState<string>('');
  const debouncedLocationString = useDebouncedValue<string>(locationString);

  function searchStringHandle(value: string) {
    setLocationString(value);
  }

  const { data } = useQuery({
    queryKey: ['geocoding', debouncedLocationString],
    queryFn: getLoacationByName,
    enabled: debouncedLocationString.length > 2,
  });

  const locations = data?.results;

  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="w-md">
        <LocationSearch
          searchString={locationString}
          onSearchStringChange={searchStringHandle}
        />

        {locations?.length
          ? locations.map((location) => (
              <div key={location.id}>{location.name}</div>
            ))
          : null}
      </div>
    </div>
  );
}

export default WeatherApp;
