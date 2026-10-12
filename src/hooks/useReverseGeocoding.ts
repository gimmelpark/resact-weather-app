import { getLocationNameByCoordinates } from '@/api/api';
import type { ILocationDetails } from '@/models/geocoding';
import { useQuery } from '@tanstack/react-query';

export function useReverseGeocoding(
  coords: { lat: number; lon: number } | null,
) {
  const { data } = useQuery({
    queryKey: ['reverseGeocoding', coords?.lat, coords?.lon],
    queryFn: getLocationNameByCoordinates,
    enabled: !!coords,
  });

  const userLocation: ILocationDetails | null =
    data && coords
      ? {
          id: `${coords.lat},${coords.lon}`,
          name: data.city ?? data.locality ?? 'Unknown location',
          country: data.countryName,
          latitude: coords.lat,
          longitude: coords.lon,
        }
      : null;

  return { userLocation };
}
