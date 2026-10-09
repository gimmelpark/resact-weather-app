import { getLocationNameByCoordinates } from '@/api/api';
import type {
  ILocationDetails,
  IReverseGeocodingAPIResult,
} from '@/models/geocoding';
import { useQuery } from '@tanstack/react-query';
import {
  useEffect,
  useEffectEvent,
  type Dispatch,
  type SetStateAction,
} from 'react';

export function useReverseGeocoding(
  coords: { lat: number; lon: number } | null,
  setLocation: Dispatch<SetStateAction<ILocationDetails | null>>,
) {
  const { data } = useQuery({
    queryKey: ['reverseGeocoding', coords?.lat, coords?.lon],
    queryFn: getLocationNameByCoordinates,
    enabled: !!coords,
  });

  const onDataLoaded = useEffectEvent(
    (data: IReverseGeocodingAPIResult | undefined) => {
      if (data && coords) {
        const location: ILocationDetails = {
          id: `${coords.lat},${coords.lon}`,
          name: data.city ?? data.locality ?? 'Unknown location',
          country: data.countryName,
          latitude: coords.lat,
          longitude: coords.lon,
        };

        setLocation(location);
      }
    },
  );

  useEffect(() => {
    onDataLoaded(data);
  }, [data]);
}
