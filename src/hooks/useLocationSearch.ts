import { getLoacationByName } from '@/api/api';
import type { ILocationDetails } from '@/models/geocoding';
import { useQuery } from '@tanstack/react-query';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useDebouncedValue } from './useDebouncedValue';

export function useLocationSearch(
  setCoords: Dispatch<SetStateAction<{ lat: number; lon: number } | null>>,
  setLocation: Dispatch<SetStateAction<ILocationDetails | null>>,
) {
  const [locationString, setLocationString] = useState<string>('');
  const debouncedLocationString = useDebouncedValue<string>(locationString);
  const [hideLoactionsSelect, setHideLocationSelect] = useState(false);

  function searchStringChangeHandle(value: string) {
    setLocationString(value);
    setHideLocationSelect(false);
  }

  function locationSelectHandle(locationId: number | string) {
    const location = data?.results?.find(({ id }) => id === locationId) ?? null;
    setLocation(location);

    setHideLocationSelect(true);

    if (location) {
      setCoords({
        lat: location.latitude,
        lon: location.longitude,
      });
      setLocationString(location.name);
    }
  }

  const { data } = useQuery({
    queryKey: ['geocoding', debouncedLocationString],
    queryFn: getLoacationByName,
    enabled: debouncedLocationString.length > 2,
  });

  const locations = data?.results;
  const showLoactionsSelect = data?.results && !hideLoactionsSelect;

  return {
    locationString,
    showLoactionsSelect,
    locations,
    setLocationString,
    searchStringChangeHandle,
    locationSelectHandle,
  };
}
