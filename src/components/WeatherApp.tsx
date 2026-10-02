import { useState } from 'react';
import LocationSearch from './LocationSearch';

function WeatherApp() {
  const [locationString, setLocationString] = useState<string>('');

  function searchStringHandle(value: string) {
    setLocationString(value);
  }

  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="w-md">
        <LocationSearch
          searchString={locationString}
          onSearchStringChange={searchStringHandle}
        />
      </div>
    </div>
  );
}

export default WeatherApp;
