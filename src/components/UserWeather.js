import { useEffect } from "react";
import { WEATHER_APP_API_KEY, WEATHER_APP_API_URL } from "../api";
import { createRoot } from "react-dom/client";

const UserWeather = () => {
  // get user location data
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const getGeoLocation = (pos) => {
    console.log("Your current position is:");
    console.log(`Latitude : ${pos.coords.latitude}`);
    console.log(`Longitude: ${pos.coords.longitude}`);
    console.log(`More or less ${pos.coords.accuracy} meters.`);
    const userLat = pos.coords.latitude;
    const userLng = pos.coords.longitude;

    fetch(
      `${WEATHER_APP_API_URL}?lat=${userLat}&lon=${userLng}&units=imperial&appid=${WEATHER_APP_API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const errorMessage = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      getGeoLocation,
      errorMessage,
      options
    );
  }, []);
};
const root = createRoot(document.getElementById("root"));
root.render(<UserWeather />);

export default UserWeather;
