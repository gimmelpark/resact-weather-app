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
    showLocationsSelect,
    locations,
    setLocationString,
    handleSearchStringChange,
    handleLocationSelect,
  } =useLocationSearch((location: ILocationDetails) => {
    setLocationCoords({
      lat: location.latitude,
      lon: location.longitude,
    });
    setSelectedLocation(location);
  });

  const { isPendingUserPos, handleGetCurrentGeolocation } =
    useCurrentGeolocation(
      locationCoords,
      (latitude: number, longitude: number) => {
        setLocationCoords({
          lat: latitude,
          lon: longitude,
        });

        setSelectedLocation(null);
        setLocationString('');
      },
    );

  const { userLocation } = useReverseGeocoding(locationCoords);

  const shownLocation = selectedLocation ?? userLocation;

  return (
    <div className="flex justify-center h-dvh">
      <div className="w-md mx-3">
        <div className="h-65 flex flex-col-reverse">
          <LocationSearch
            searchString={locationString}
            isPendingUserPos={isPendingUserPos}
            onSearchStringChange={handleSearchStringChange}
            onGetGeolocationClick={handleGetCurrentGeolocation}
          />

          {showLocationsSelect ? (
            <LocationSelect
              locations={locations}
              isPendingUserPos={isPendingUserPos}
              onLocationSelect={handleLocationSelect}
            />
          ) : null}
        </div>

        {locationCoords ? (
          <div className="mt-3">
            <Weather location={shownLocation} locationCoords={locationCoords} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WeatherApp;
