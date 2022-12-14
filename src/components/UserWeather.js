import React, { useEffect, useState } from "react";
import { WEATHER_APP_API_KEY, WEATHER_APP_API_URL } from "../api";

const UserWeather = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCurrentWeatherData = async () => {
      const response = await fetch(
        `${WEATHER_APP_API_URL}?lat=${lat}&lon=${long}&units=imperial&appid=${WEATHER_APP_API_KEY}`
      );
      const data = await response.json();
      // Store current weather obj to state variable
      setData(data);
    };
    // If lat and long are defined, fetch the current weather
    if (lat && long) {
      fetchCurrentWeatherData();
    }
  }, [lat, long]);

  // Get user's current coordinates using the navigator geolocation API
  useEffect(() => {
    const getUserCoordinates = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        // Set lat, long coordinates to state variables
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    };
    getUserCoordinates();
  }, []);

  return (
    <div className="user-container">
      {/* Don't render until the data has returned */}
      {data.current && (
        <h1 className="user-temp">
          Current Temperature: {Math.trunc(data.current.temp)}°
        </h1>
      )}
    </div>
  );
};

export default UserWeather;
