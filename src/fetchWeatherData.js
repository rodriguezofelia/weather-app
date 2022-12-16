import { WEATHER_APP_API_KEY, WEATHER_APP_API_URL } from "../src/api";

// Makes call to API with lat as params
const fetchWeatherData = async (lat, long) => {
  const response = await fetch(
    `${WEATHER_APP_API_URL}?lat=${lat}&lon=-${long}&units=imperial&appid=${WEATHER_APP_API_KEY}`
  );
  // JSON of all coordinates that are passed in that return all available info
  const data = await response.json();
  return data;
};

export default fetchWeatherData;
