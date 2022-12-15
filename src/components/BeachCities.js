import React, { useState, useEffect } from "react";
import data from "../data/data.json";
import fetchWeatherData from "../fetchWeatherData";

// loop through all the beach cities
// get weather data for each city
// filter for weather threshold
// return a list of cities with their current temp that quality

const BeachCities = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const getWeather = () => {
      let returned_weather_data = [];
      data.beachCities.forEach(async (cityData) => {
        let currentWeatherData = await fetchWeatherData(
          cityData.lat,
          cityData.lng
        );
        // don't forget to add other conditions
        if (currentWeatherData.current.temp >= 70) {
          returned_weather_data.push({
            name: cityData.name,
            currentTemp: currentWeatherData.current.temp,
          });
        } else {
          returned_weather_data.push({
            name: cityData.name,
            currentTemp: currentWeatherData.current.temp,
            disqualifyReason: "Enter reasons here.",
          });
        }
      });
      setLoading(false);
      setWeatherData(returned_weather_data);
      console.log(returned_weather_data);
    };
    getWeather();
  }, []);

  return (
    <div>
      <h1 className="beach-cities">Beach Cities</h1>
      <p>
        Looking to travel? Check out these beach cities and their current
        conditions.
      </p>
      {loading && weatherData.length === 0 ? (
        <p>Loading data ...</p>
      ) : (
        <div>
          {weatherData.forEach((city) => (
            <div>{city.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeachCities;
