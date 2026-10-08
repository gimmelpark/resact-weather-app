import { getLoacationByName } from '@/api/api';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import type { ILocationDetails } from '@/models/geocoding';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LocationSearch from './LocationSearch';
import LocationSelect from './LocationSelect';
import Weather from './Weather';

function WeatherApp() {
  const [locationString, setLocationString] = useState<string>('');
  const debouncedLocationString = useDebouncedValue<string>(locationString);

  const [selectedLocation, setSelectedLocation] =
    useState<null | ILocationDetails>(null);

  const [hideLoactionsSelect, setHideLocationSelect] = useState(false);

  function searchStringChangeHandle(value: string) {
    setLocationString(value);
    setHideLocationSelect(false);
  }

  function getGeolocationClickHandle() {
    console.log(123);
  }

  function locationSelectHandle(locationId: number) {
    const location = locations?.find(({ id }) => id === locationId) ?? null;
    setSelectedLocation(location);
    setHideLocationSelect(true);

    if (location) {
      setLocationString(location.name);
    }
  }

  const { data } = useQuery({
    queryKey: ['geocoding', debouncedLocationString],
    queryFn: getLoacationByName,
    enabled: debouncedLocationString.length > 2,
  });

  const showLoactionsSelect = data?.results && !hideLoactionsSelect;

  const locations = data?.results;

  return (
    <div className="flex justify-center h-dvh">
      <div className="w-md mx-3">
        <div className="h-65 flex flex-col-reverse">
          <LocationSearch
            searchString={locationString}
            onSearchStringChange={searchStringChangeHandle}
            onGetGeolocationClick={getGeolocationClickHandle}
          />

          {showLoactionsSelect ? (
            <LocationSelect
              locations={locations}
              onLocationSelect={locationSelectHandle}
            />
          ) : null}
        </div>

        {selectedLocation ? (
          <div className="mt-3">
            <Weather location={selectedLocation} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WeatherApp;
