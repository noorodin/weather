import { Unit, Weather } from "@/types/types.s";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
  weatherData: Weather | null;
  unit: Unit;
};

// Render 7-day forecast
const CurrentWeather = ({ weatherData, unit }: Props) => {
  if (!weatherData) return null;

  return (
    <div className="flex flex-col items-center gap-1">
      <h1 className="text-3xl font-bold">{weatherData.city_name}</h1>
      <p>{format(new Date(), "EEEE, MMMM d, yyyy - HH:MM")}</p>
      <p>
        Temperature: {weatherData.temp}°{unit}
      </p>
      <p>{weatherData.weather.description}</p>
      <Image
        src={`https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`}
        alt="weather icon"
        width={100}
        height={100}
      />
    </div>
  );
};

export default CurrentWeather;
