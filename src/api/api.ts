import type { IForecastApiResult } from '@/models/forecast';
import type {
  ICoordinates,
  IGeocodingAPIResult,
  IReverseGeocodingAPIResult,
} from '@/models/geocoding';
import { queryOptions, type QueryFunctionContext } from '@tanstack/react-query';

function getUrl(
  baseUrl: string,
  params?: Record<string, string | number | undefined>,
): string {
  let paramsString = new URLSearchParams(
    Object.entries(params ?? {})
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, `${value}`]),
  ).toString();

  if (paramsString.length) paramsString = '?' + paramsString;

  return baseUrl + paramsString;
}

async function httpGet<ReturnType>(
  url: string,
  params?: Record<string, string | number | undefined>,
): Promise<ReturnType> {
  const response = await fetch(getUrl(url, params));

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
}

function getLocationByName({
  queryKey,
}: QueryFunctionContext<['geocoding', name: string]>) {
  const [, name] = queryKey;

  const url = 'https://geocoding-api.open-meteo.com/v1/search';

  return httpGet<IGeocodingAPIResult>(url, { name, count: 5 });
}

export function geocodingOptions(name: string) {
  return queryOptions({
    queryKey: ['geocoding', name],
    queryFn: getLocationByName,
    enabled: name.length > 2,
  });
}

function getWeatherForecast({
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

export function forecastOptions(latitude: number, longitude: number) {
  return queryOptions({
    queryKey: ['forecast', latitude, longitude],
    queryFn: getWeatherForecast,
  });
}

function getLocationNameByCoordinates({
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

export function reverseGeocodingOptions(coords: ICoordinates | null) {
  return queryOptions({
    queryKey: ['reverseGeocoding', coords?.latitude, coords?.longitude],
    queryFn: getLocationNameByCoordinates,
    enabled: !!coords,
  });
}
