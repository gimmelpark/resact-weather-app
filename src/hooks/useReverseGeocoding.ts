import { reverseGeocodingOptions } from '@/api/api';
import type { ICoordinates, ILocationDetails } from '@/models/geocoding';
import { useQuery } from '@tanstack/react-query';

export function useReverseGeocoding(coords: ICoordinates | null) {
  const { data } = useQuery(reverseGeocodingOptions(coords));

  const userLocation: ILocationDetails | null =
    data && coords
      ? {
          id: `${coords.latitude},${coords.longitude}`,
          name: data.city ?? data.locality ?? 'Unknown location',
          country: data.countryName,
          latitude: coords.latitude,
          longitude: coords.longitude,
        }
      : null;

  return { userLocation };
}
