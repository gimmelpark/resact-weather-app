import wmo_weather_codes from '@/data/wmo_weather_codes.json';

interface ICodeDescription {
  day: {
    description: string;
    image: string;
  };
  night: {
    description: string;
    image: string;
  };
}
const codesData: Record<string, ICodeDescription | undefined> =
  wmo_weather_codes;

export function getWMODescriptionByCode(
  code: number,
  isDay: boolean,
): string | undefined {
  return codesData[code]?.[isDay ? 'day' : 'night'].description;
}

export function getWMOImageUrlByCode(
  code: number,
  isDay: boolean,
): string | undefined {
  return codesData[code]?.[isDay ? 'day' : 'night'].image;
}
