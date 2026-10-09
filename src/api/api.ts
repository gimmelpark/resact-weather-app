import type { IForecastApiResult } from '@/models/forecast';
import type {
  IGeocodingAPIResult,
  IReverseGeocodingAPIResult,
} from '@/models/geocoding';
import type { QueryFunctionContext } from '@tanstack/react-query';

function getUrl(
  baseUrl: string,
  params?: Record<string, string | number | undefined>,
): string {
  let paramsString = Object.entries(params ?? {})
    .filter(([, value]) => !!value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  if (paramsString.length) paramsString = '?' + paramsString;

  return baseUrl + paramsString;
}

async function httpGet<ReturnType>(
  url: string,
  params?: Record<string, string | number | undefined>,
): Promise<ReturnType | undefined> {
  try {
    const response = await fetch(getUrl(url, params));

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export function getLoacationByName({
  queryKey,
}: QueryFunctionContext<['geocoding', name: string]>) {
  const [, name] = queryKey;

  const url = 'https://geocoding-api.open-meteo.com/v1/search';

  return httpGet<IGeocodingAPIResult>(url, { name, count: 5 });
}

export function getWeatherForecast({
  queryKey,
}: QueryFunctionContext<['forecast', latitude: number, longitude: number]>) {
  const [, latitude, longitude] = queryKey;

  const url = 'https://api.open-meteo.com/v1/forecast';
  const params = {
    latitude,
    longitude,
    timezone: 'auto',
    current: 'temperature_2m,apparent_temperature,is_day,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
  };

  return httpGet<IForecastApiResult>(url, params);
}

export function getLocationNameByCoordinates({
  queryKey,
}: QueryFunctionContext<
  ['reverseGeocoding', latitude?: number, longitude?: number]
>) {
  const [, latitude, longitude] = queryKey;

  const url = 'https://api-bdc.net/data/reverse-geocode';
  const params = {
    latitude,
    longitude,
    localityLanguage: 'en',
    key: import.meta.env.VITE_BIGDATACLOUD_API_KEY,
  };

  return httpGet<IReverseGeocodingAPIResult>(url, params);
}
