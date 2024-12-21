"use client";

import { useState, useEffect } from "react";
import Notification from "@/components/Notification";
import WeatherForecast from "@/components/WeatherForecast";
import CurrentWeather from "@/components/CurrentWeather";
import { Location, Unit } from "@/types/types.s";
import useWeather from "@/hooks/useWeather";

const Home = () => {
  const [location, setLocation] = useState<Location>({ lat: 0, lon: 0 });
  const [unit, setUnit] = useState<Unit>("C"); // Temperature unit
  const [showForecast, setShowForecast] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { weatherData, forecastData, isSearching, fetchWeatherData } =
    useWeather();

  // Detect user location and fetch weather data
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          fetchWeatherData({
            lat: latitude,
            lon: longitude,
            searchQuery: "",
            unit,
            setError,
            setLocation,
          });
        },
        () => setError("Failed to detect location.")
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Get weather and forecast when unit changes
  useEffect(() => {
    if (location.lat && location.lon) {
      fetchWeatherData({
        lat: location.lat,
        lon: location.lon,
        searchQuery,
        unit,
        setError,
        setLocation,
      });
    }
  }, [unit]);

  // Refresh weather and forecast data
  const refreshWeather = () => {
    if (location.lat && location.lon) {
      fetchWeatherData({
        lat: location.lat,
        lon: location.lon,
        searchQuery,
        unit,
        setError,
        setLocation,
      });
    }
  };

  // Search for weather by city name
  const handleSearch = () => {
    fetchWeatherData({
      searchQuery,
      unit,
      setError,
      setLocation,
    });
  };

  // Toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen flex flex-col items-center">
      {error && <Notification message={error} />}

      {/* Search Input */}
      <div className="mb-6 w-full max-w-md">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city"
            className="flex-grow p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className={`px-4 py-2 rounded ${
              isSearching ? "bg-gray-400" : "bg-blue-600 text-white"
            }`}
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {weatherData ? (
        <>
          <CurrentWeather weatherData={weatherData} unit={unit} />

          <div className="flex gap-4 flex-wrap my-8">
            <button
              onClick={() => setShowForecast((prev) => !prev)}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {showForecast ? "Hide 7-Day Forecast" : "Show 7-Day Forecast"}
            </button>

            <button
              onClick={refreshWeather}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Refresh
            </button>

            <button
              onClick={toggleUnit}
              className="px-4 py-2 bg-purple-800 text-white rounded"
            >
              Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
            </button>
          </div>

          {showForecast && (
            <WeatherForecast forecastData={forecastData} unit={unit} />
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Home;
