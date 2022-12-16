import "./App.css";
import React from "react";
import UserWeather from "./components/UserWeather";
import CityData from "./components/Cities";

export default function App() {
  return (
    <div className="App">
      <UserWeather />
      <div>
        <h1 className="cities">Beach Cities</h1>
        <p>
          Looking to travel somewhere warm? Check out these cities and their
          current conditions.
        </p>
      </div>
      <CityData locationType={"beachCities"} />
      <div>
        <h1 className="cities">Ski Cities</h1>
        <p>
          Looking to travel somewhere cold? Check out these cities and their
          current conditions.
        </p>
      </div>
      <CityData locationType={"skiCities"} />
    </div>
  );
}
