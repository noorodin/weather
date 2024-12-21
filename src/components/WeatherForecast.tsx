"use client";

import { Forecast, Unit } from "@/types/types.s";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
  forecastData: Forecast | null;
  unit: Unit;
};

// Render 7-day forecast
const WeatherForecast = ({ forecastData, unit }: Props) => {
  if (!forecastData) return null;

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {forecastData.map((day) => (
        <div
          key={day.valid_date}
          className="flex flex-col p-4 pt-6 bg-gray-100 rounded-md shadow-md"
        >
          <p>{format(new Date(day.valid_date), "EEEE, MMM d yyyy")}</p>
          <p>
            Temperature: {day.temp}°{unit}
          </p>
          <p>{day.weather.description}</p>
          <Image
            className="self-center"
            src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
            alt="weather forcast icon"
            width={50}
            height={50}
          />
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
