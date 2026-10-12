import { getLocationByName } from '@/api/api';
import type { ILocationDetails } from '@/models/geocoding';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedValue } from './useDebouncedValue';

export function useLocationSearch(
  onSelect: (location: ILocationDetails) => void,
) {
  const [locationString, setLocationString] = useState<string>('');
  const debouncedLocationString = useDebouncedValue<string>(locationString);
  const [hideLocationsSelect, setHideLocationsSelect] = useState(false);

  function handleSearchStringChange(value: string) {
    setLocationString(value);
    setHideLocationsSelect(false);
  }

  function handleLocationSelect(locationId: number | string) {
    const location = data?.results?.find(({ id }) => id === locationId) ?? null;
    if (!location) return;

    setHideLocationsSelect(true);
    setLocationString(location.name);

    onSelect(location);
  }

  const { data } = useQuery({
    queryKey: ['geocoding', debouncedLocationString],
    queryFn: getLocationByName,
    enabled: debouncedLocationString.length > 2,
  });

  const locations = data?.results;
  const showLocationsSelect = data?.results && !hideLocationsSelect;

  return {
    locationString,
    showLocationsSelect,
    locations,
    setLocationString,
    handleSearchStringChange,
    handleLocationSelect,
  };
}
