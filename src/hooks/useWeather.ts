import { useState } from "react";
import axios from "axios";
import { Location, Forecast, Weather, Unit } from "@/types/types.s";

const API_KEY = "ee3516ff761c47c88988789258217efa";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [forecastData, setForecastData] = useState<Forecast | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const fetchWeatherData = async ({
    lat,
    lon,
    searchQuery,
    unit,
    setLocation,
    setError,
  }: {
    lat?: number;
    lon?: number;
    searchQuery?: string;
    unit: Unit;
    setError: (message: string) => void;
    setLocation?: (location: Location) => void;
  }) => {
    setError("");

    try {
      if (searchQuery) {
        // Fetch weather by city name
        setIsSearching(true);
        const response = await axios.get(
          `https://api.weatherbit.io/v2.0/current?city=${searchQuery}&key=${API_KEY}&units=${
            unit === "C" ? "M" : "I"
          }`
        );
        const weather = response.data.data[0];
        if (setLocation) setLocation({ lat: weather.lat, lon: weather.lon });
        setWeatherData(weather);
        await fetchForecastData(weather.lat, weather.lon, unit, setError); // Fetch forecast for searched city
      } else if (lat && lon) {
        // Fetch weather by coordinates
        const response = await axios.get(
          `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}&units=${
            unit === "C" ? "M" : "I"
          }`
        );
        setWeatherData(response.data.data[0]);
        await fetchForecastData(lat, lon, unit, setError); // Fetch forecast for searched city
      }
    } catch {
      setWeatherData(null);
      setForecastData(null);
      setError(
        searchQuery
          ? "City not found. Please try again."
          : "Failed to fetch weather data."
      );
    } finally {
      if (searchQuery) setIsSearching(false);
    }
  };

  const fetchForecastData = async (
    lat: number,
    lon: number,
    unit: Unit,
    setError: (message: string) => void
  ) => {
    setError("");

    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?days=7&lat=${lat}&lon=${lon}&key=${API_KEY}&units=${
          unit === "C" ? "M" : "I"
        }`
      );
      setForecastData(response.data.data);
    } catch {
      setError("Failed to fetch forecast data.");
    }
  };

  return {
    weatherData,
    forecastData,
    isSearching,
    fetchWeatherData,
    fetchForecastData,
  };
};

export default useWeather;
