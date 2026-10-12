import { getCurrentGeolocation } from '@/helpers/getGeolocation';
import type { ICoordinates } from '@/models/geocoding';
import { useState } from 'react';

export function useCurrentGeolocation(
  coords: ICoordinates | null,
  onLocate: (latitude: number, longitude: number) => void,
) {
  const [isPendingUserPos, setIsPendingUserPos] = useState(false);

  async function handleGetCurrentGeolocation() {
    setIsPendingUserPos(true);

    const pos = await getCurrentGeolocation();

    if (pos) {
      const newLat = Math.round(pos.coords.latitude * 1000) / 1000;
      const newLon = Math.round(pos.coords.longitude * 1000) / 1000;

      onLocate(newLat, newLon);
    }

    setIsPendingUserPos(false);
  }

  return {
    isPendingUserPos,
    handleGetCurrentGeolocation,
  };
}
