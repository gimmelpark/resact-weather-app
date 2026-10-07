export interface ILocationDetails {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface IGeocodingAPIResult {
  results?: ILocationDetails[];
}
