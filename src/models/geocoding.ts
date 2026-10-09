export interface ILocationDetails {
  id: number | string;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
}

export interface IGeocodingAPIResult {
  results?: ILocationDetails[];
}

export interface IReverseGeocodingAPIResult {
  city?: string;
  locality?: string;
  countryName?: string;
}
