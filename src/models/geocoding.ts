export interface ILocationDetails {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface IGeocodingAPIResult {
  results: ILocationDetails[];
}
