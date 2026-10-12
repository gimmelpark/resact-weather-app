export function getCurrentGeolocation(): Promise<GeolocationPosition | null> {
  if ('geolocation' in navigator) {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        () => resolve(null),
      );
    });
  }

  return Promise.resolve(null);
}
