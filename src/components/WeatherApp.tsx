import { useCurrentGeolocation } from '@/hooks/useCurrentGeolocation';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { useReverseGeocoding } from '@/hooks/useReverseGeocoding';
import type { ILocationDetails } from '@/models/geocoding';
import { useState } from 'react';
import LocationSearch from './LocationSearch';
import LocationSelect from './LocationSelect';
import Weather from './Weather';

function WeatherApp() {
  const [selectedLocation, setSelectedLocation] =
    useState<null | ILocationDetails>(null);

  const [locationCoords, setLocationCoords] = useState<null | {
    lat: number;
    lon: number;
  }>(null);

  const {
    locationString,
    showLoactionsSelect,
    locations,
    setLocationString,
    searchStringChangeHandle,
    locationSelectHandle,
  } = useLocationSearch(setLocationCoords, setSelectedLocation);

  const { isPendingUserPos, getCurrentGeolocationHandle } =
    useCurrentGeolocation(
      locationCoords,
      setLocationCoords,
      setSelectedLocation,
      setLocationString,
    );

  useReverseGeocoding(locationCoords, setSelectedLocation);

  return (
    <div className="flex justify-center h-dvh">
      <div className="w-md mx-3">
        <div className="h-65 flex flex-col-reverse">
          <LocationSearch
            searchString={locationString}
            isPendingUserPos={isPendingUserPos}
            onSearchStringChange={searchStringChangeHandle}
            onGetGeolocationClick={getCurrentGeolocationHandle}
          />

          {showLoactionsSelect ? (
            <LocationSelect
              locations={locations}
              isPendingUserPos={isPendingUserPos}
              onLocationSelect={locationSelectHandle}
            />
          ) : null}
        </div>

        {locationCoords ? (
          <div className="mt-3">
            <Weather
              location={selectedLocation}
              locationCoords={locationCoords}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WeatherApp;
