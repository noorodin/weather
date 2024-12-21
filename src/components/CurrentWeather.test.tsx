import { render, screen } from "@testing-library/react";
import CurrentWeather from "./CurrentWeather";
import { Unit, Weather } from "@/types/types.s";
import { format } from "date-fns";
import "@testing-library/jest-dom";

describe("CurrentWeather Component", () => {
  const mockWeatherData: Weather = {
    city_name: "Test City",
    temp: 25,
    weather: {
      description: "Clear sky",
      icon: "c01d",
    },
  };
  const unit: Unit = "C"; // Assuming "C" for Celsius

  it("renders correctly when weatherData is provided", () => {
    render(<CurrentWeather weatherData={mockWeatherData} unit={unit} />);

    // Check if city name is rendered
    expect(screen.getByText("Test City")).toBeInTheDocument();

    // Check if temperature is rendered correctly
    expect(screen.getByText("Temperature: 25°C")).toBeInTheDocument();

    // Check if weather description is rendered
    expect(screen.getByText("Clear sky")).toBeInTheDocument();

    // Check if the date is displayed in the correct format
    const formattedDate = format(new Date(), "EEEE, MMMM d, yyyy - HH:MM");
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it("renders nothing when weatherData is null", () => {
    render(<CurrentWeather weatherData={null} unit={unit} />);
    // The component should render nothing
    expect(screen.queryByText("Test City")).toBeNull();
    expect(screen.queryByText("Temperature")).toBeNull();
    expect(screen.queryByText("Clear sky")).toBeNull();
  });
});
