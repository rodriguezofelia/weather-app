import "../App.css";
import React, { useState, useEffect } from "react";
import data from "../data/data.json";
import fetchWeatherData from "../fetchWeatherData";

// A configuration for the disqualification reasons
const beachDisqualificationsMap = [
  {
    // Key of the field in currentWeatherData.current
    key: "temp",
    // Function with immediate return to test whether it is disqualified because of this field
    test: (temp) => temp <= 70,
    // User-friendly reason to display
    reason: "Temperature is below 70 degrees",
  },
  {
    key: "wind_speed",
    test: (speed) => speed > 20,
    reason: "Wind speed is above 20",
  },
  {
    key: "clouds",
    test: (clouds) => clouds > 0,
    reason: "It's cloudy",
  },
];

const skiDisqualificationsMap = [
  {
    key: "temp",
    test: (temp) => temp > 50,
    reason: "Temperature is above 50 degrees",
  },
];

// weatherData is the currentWeatherData passed below
// beachOrSki is either 'beach' or 'ski
//It will return a list of reasons if the city is disqualified

const getDisqualifications = (weatherData, beachOrSki) => {
  // Empty array to initialize
  const disqualifications = [];
  // Details which map to be used on the beachOrSki param (beachDisqualificationsMap or skiDisqualificationsMap)
  const disqualificationMap =
    beachOrSki === "beach"
      ? beachDisqualificationsMap
      : skiDisqualificationsMap;
  // Loop over each obj in the map
  disqualificationMap.forEach((disqualification) => {
    // Use test function to see if the city should be disqualified for the current iteration
    const failed = disqualification.test(
      weatherData.current[disqualification.key]
    );
    if (failed) {
      // If disqualified, push the reason
      disqualifications.push(disqualification.reason);
    }
  });

  // Check for any alerts
  if (weatherData.alerts) {
    // If there are alerts, loop over them and add them to the disqualifications array
    weatherData.alerts.forEach((alert) => {
      disqualifications.push(alert.description);
    });
  }
  // Returns the list of reasons
  return disqualifications;
};

const CityData = (props) => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const getWeather = async () => {
      // Empty array to initialize
      let returnedWeatherData = [];
      const getData = async (cityData) => {
        // JSON of all coordinates that are passed in that return all available info
        let currentWeatherData = await fetchWeatherData(
          cityData.lat,
          cityData.lng
        );
        if (props.locationType === "beachCities") {
          // Conditionals for what qualifies a beach city
          if (
            currentWeatherData.current.temp >= 70 &&
            currentWeatherData.current.wind_speed < 20 &&
            currentWeatherData.current.clouds <= 0
          ) {
            // Push data to array
            returnedWeatherData.push({
              name: cityData.name,
              currentTemp: currentWeatherData.current.temp,
              windSpeed: currentWeatherData.current.wind_speed,
              hasClouds: currentWeatherData.current.clouds,
              location: "beach",
            });
          } else {
            // Will push data above, along with alerts and disqualify events
            returnedWeatherData.push({
              name: cityData.name,
              currentTemp: currentWeatherData.current.temp,
              windSpeed: currentWeatherData.current.wind_speed,
              hasClouds: currentWeatherData.current.clouds,
              alerts: currentWeatherData.alerts || "",
              // Calls function and with location type and iterates over all disqualifications, if any
              disqualifyReason: `Reason(s) for disqualification:  ${getDisqualifications(
                currentWeatherData,
                "beach"
              ).map((disqualification) => {
                return disqualification;
              })} `,
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
              disqualifyReason: `Reason(s) for disqualification: ${getDisqualifications(
                currentWeatherData,
                "ski"
              ).map((disqualification) => {
                return disqualification;
              })} `,
            });
          }
        }
      };
      // Sets location type to beachCities or skiCities based of JSON data
      const locationType = props.locationType;
      // Passes in location type, iterates over beachCities or skiCities and fetches data from api
      const promises = data[locationType].map((city) => getData(city));
      // Takes an array of promises and returns a single promise that is then awaited
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

export default CityData;
