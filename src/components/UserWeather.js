import React, { useEffect, useState } from "react";
import { WEATHER_APP_API_KEY, WEATHER_APP_API_URL } from "../api";

const UserWeather = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     setLat(position.coords.latitude);
  //     setLong(position.coords.longitude);
  //   });
  // }, [lat, long]);

  useEffect(() => {
    const fetchData = async () => {
      // navigator.geolocation.getCurrentPosition(function (position) {
      //   setLat(position.coords.latitude);
      //   setLong(position.coords.longitude);
      // });

      const response = await fetch(
        `${WEATHER_APP_API_URL}?lat=${lat}&lon=${long}&units=imperial&appid=${WEATHER_APP_API_KEY}`
      );
      const data = await response.json();
      setData(data);
      console.log(data, "data");
    };
    fetchData();
  }, [lat, long]);

  // console.log(data, "data");
  // console.log(data.current, "this works");
  return (
    <div>
      <h1 className="temperature">
        Current Temperature:{JSON.stringify(data.current.temp)}
      </h1>
    </div>
  );
};

export default UserWeather;
