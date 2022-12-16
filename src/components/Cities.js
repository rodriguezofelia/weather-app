import "../App.css";
import React, { useState, useEffect } from "react";
import data from "../data/data.json";
import fetchWeatherData from "../fetchWeatherData";

const RenderCityData = (props) => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const getWeather = async () => {
      let returnedWeatherData = [];
      const getData = async (cityData) => {
        let currentWeatherData = await fetchWeatherData(
          cityData.lat,
          cityData.lng
        );
        if (props.locationType === "beachCities") {
          if (
            currentWeatherData.current.temp >= 70 &&
            currentWeatherData.current.wind_speed < 20 &&
            currentWeatherData.current.clouds <= 0
          ) {
            returnedWeatherData.push({
              name: cityData.name,
              currentTemp: currentWeatherData.current.temp,
              windSpeed: currentWeatherData.current.wind_speed,
              hasClouds: currentWeatherData.current.clouds,
              location: "beach",
            });
          } else {
            returnedWeatherData.push({
              name: cityData.name,
              currentTemp: currentWeatherData.current.temp,
              windSpeed: currentWeatherData.current.wind_speed,
              hasClouds: currentWeatherData.current.clouds,
              alerts: currentWeatherData.alerts || "",
              // COME BACK FIX DISQUALIFYING REASONS
              disqualifyReason: `Reason(s) for disqualification:  ${
                Math.trunc(currentWeatherData.current.temp) ||
                currentWeatherData.windSpeed ||
                !!currentWeatherData.hasClouds ||
                currentWeatherData.alerts
              } `,
            });
          }
        } else if (props.locationType === "skiCities") {
          if (currentWeatherData.current.temp < 50) {
            returnedWeatherData.push({
              name: cityData.name,
              currentTemp: currentWeatherData.current.temp,
              location: "ski",
            });
          } else {
            returnedWeatherData.push({
              name: cityData.name,
              currentTemp: currentWeatherData.current.temp,
              alerts: currentWeatherData.alerts || "",
              // COME BACK FIX DISQUALIFYING REASONS
              disqualifyReason: `Reason(s) for disqualification: ${
                Math.trunc(currentWeatherData.current.temp) ||
                currentWeatherData.alerts
              } `,
            });
          }
        }
      };
      const locationType = props.locationType;
      const promises = data[locationType].map((city) => getData(city));
      await Promise.all(promises);
      setLoading(false);
      setWeatherData(returnedWeatherData);
    };
    getWeather();
  }, []);

  return (
    <div className="container">
      {loading && weatherData.length === 0 ? (
        <p>Loading data ...</p>
      ) : (
        <div>
          <div className="header-section">
            <div className="info">City</div>
            <div className="info">Temperature</div>
            <div className="info">Disqualified?</div>
          </div>
          {weatherData.map((city) => (
            <div className="city-section">
              {" "}
              <div className="info">
                <div>{city.name}</div>
              </div>
              <div className="info">
                <div> {Math.trunc(city.currentTemp)}°</div>
              </div>
              <div className="info">
                <div> {city.disqualifyReason}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RenderCityData;
