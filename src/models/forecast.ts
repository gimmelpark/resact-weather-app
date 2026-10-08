export interface IForecastApiResult {
  current_units: ICurrentWeatherUnits;
  current: ICurrentWeather;
  daily_units: IDailyWeatherUnits;
  daily: IDailyWeather;
}

export interface ICurrentWeatherUnits {
  interval: string;
  temperature_2m: string;
  apparent_temperature: string;
}

export interface ICurrentWeather {
  temperature_2m: number;
  apparent_temperature: number;
  is_day: number;
  weather_code: number;
}

export interface IDailyWeatherUnits {
  temperature_2m_max: string;
  temperature_2m_min: string;
}

interface IDailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}
