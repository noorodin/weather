export type Forecast = {
  valid_date: string;
  temp: number;
  weather: {
    description: string;
    icon: string;
  };
}[];

export type Unit = "C" | "F";

export type Location = {
  lat: number;
  lon: number;
};

export type Weather = {
  city_name: string;
  temp: number;
  weather: {
    description: string;
    icon: string;
  };
};
