import { WEATHER_APP_API_KEY, WEATHER_APP_API_URL } from "../src/api";

const fetchWeatherData = async (lat, long) => {
  const response = await fetch(
    `${WEATHER_APP_API_URL}?lat=${lat}&lon=-${long}&units=imperial&appid=${WEATHER_APP_API_KEY}`
  );
  const data = await response.json();
  return data;
};

export default fetchWeatherData;
