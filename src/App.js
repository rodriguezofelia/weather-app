import "./App.css";
import React from "react";
import UserWeather from "./components/UserWeather";
import BeachCities from "./components/BeachCities";

export default function App() {
  return (
    <div className="App">
      <p>Hi</p>
      {/* <UserWeather /> */}
      <BeachCities />
    </div>
  );
}

// import "./App.css";
// import React, { useEffect, useState } from "react";
// import { WEATHER_APP_API_KEY, WEATHER_APP_API_URL } from "./api";
// import UserWeather from "./components/UserWeather";

// export default function App() {
//   const [lat, setLat] = useState([]);
//   const [long, setLong] = useState([]);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       navigator.geolocation.getCurrentPosition(function (position) {
//         setLat(position.coords.latitude);
//         setLong(position.coords.longitude);
//       });

//       const response = await fetch(
//         `${WEATHER_APP_API_URL}?lat=${lat}&lon=${long}&units=imperial&appid=${WEATHER_APP_API_KEY}`
//       );
//       const data = await response.json();
//       // console.log(data, "DATAS");
//       setData(data);
//     };
//     fetchData();
//   }, [lat, long]);
//   return (
//     <div className="App">
//       {typeof data != "undefined" ? (
//         <UserWeather geoLocatedWeatherData={data} />
//       ) : (
//         <div>Geolocation Error</div>
//       )}
//     </div>
//   );
// }
