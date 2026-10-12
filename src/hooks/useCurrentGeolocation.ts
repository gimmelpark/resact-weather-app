import { getCurrentGeolocation } from '@/helpers/getGeolocation';
import { useState } from 'react';

export function useCurrentGeolocation(
  coords: { lat: number; lon: number } | null,
  onLocate: (latitude: number, longitude: number) => void,
) {
  const [isPendingUserPos, setIsPendingUserPos] = useState(false);

  async function handleGetCurrentGeolocation() {
    setIsPendingUserPos(true);

    const pos = await getCurrentGeolocation();

    if (pos) {
      const newLat = Math.round(pos.coords.latitude * 1000) / 1000;
      const newLon = Math.round(pos.coords.longitude * 1000) / 1000;

      if (coords?.lat !== newLat || coords?.lon !== newLon) {
        onLocate(newLat, newLon);
      }
    }

    setIsPendingUserPos(false);
  }

  return {
    isPendingUserPos,
    handleGetCurrentGeolocation,
  };
}
