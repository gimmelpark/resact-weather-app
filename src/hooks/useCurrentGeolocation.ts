import { getCurrentGeolocation } from '@/helpers/get_geolocation';
import type { ILocationDetails } from '@/models/geocoding';
import { useState, type Dispatch, type SetStateAction } from 'react';

export function useCurrentGeolocation(
  coords: { lat: number; lon: number } | null,
  setCoords: Dispatch<SetStateAction<{ lat: number; lon: number } | null>>,
  setLocation: Dispatch<SetStateAction<ILocationDetails | null>>,
  setLocationString: Dispatch<SetStateAction<string>>,
) {
  const [isPendingUserPos, setIsPendingUserPos] = useState(false);

  async function getCurrentGeolocationHandle() {
    setIsPendingUserPos(true);

    const pos = await getCurrentGeolocation();

    if (pos) {
      const newLat = Math.round(pos.coords.latitude * 1000) / 1000;
      const newLon = Math.round(pos.coords.longitude * 1000) / 1000;

      if (coords?.lat !== newLat || coords?.lon !== newLon) {
        setCoords({
          lat: newLat,
          lon: newLon,
        });

        setLocation(null);
        setLocationString('');
      }
    }

    setIsPendingUserPos(false);
  }

  return {
    isPendingUserPos,
    getCurrentGeolocationHandle,
  };
}
