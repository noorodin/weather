import { render, screen } from "@testing-library/react";
import WeatherForecast from "./WeatherForecast";
import { Forecast, Unit } from "@/types/types.s";
import { format } from "date-fns";
import "@testing-library/jest-dom";

describe("WeatherForecast Component", () => {
  const mockForecastData: Forecast = [
    {
      valid_date: "2024-12-21",
      temp: 25,
      weather: {
        description: "Clear sky",
        icon: "c01d",
      },
    },
    {
      valid_date: "2024-12-22",
      temp: 18,
      weather: {
        description: "Partly cloudy",
        icon: "c02d",
      },
    },
  ];

  const unit: Unit = "C"; // Assuming "C" for Celsius

  it("renders no content when forecastData is null", () => {
    render(<WeatherForecast forecastData={null} unit={unit} />);
    expect(screen.queryByText("Temperature")).toBeNull();
  });

  it("renders forecast data correctly", () => {
    render(<WeatherForecast forecastData={mockForecastData} unit={unit} />);

    // Check if the forecast data is rendered
    mockForecastData.forEach((day) => {
      const formattedDate = format(
        new Date(day.valid_date),
        "EEEE, MMM d yyyy"
      );
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
      expect(
        screen.getByText(`Temperature: ${day.temp}°${unit}`)
      ).toBeInTheDocument();
      expect(screen.getByText(day.weather.description)).toBeInTheDocument();
    });
  });
});
