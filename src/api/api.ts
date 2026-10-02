import type { IGeocodingAPIResult } from '@/models/geocoding';

async function httpGet<ReturnType>(
  url: string,
): Promise<ReturnType | undefined> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export function getLoacationByName(name: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=5`;

  return httpGet<IGeocodingAPIResult>(url);
}
