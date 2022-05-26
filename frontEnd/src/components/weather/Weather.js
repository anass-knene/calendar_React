import React from "react";

function Weather() {
  console.log(process.env);

  //   const fetchWeather = () => {
  //     fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${process.env.REACT_WEATHER_KEY}`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => console.log(data));
  //   };
  return (
    <div>
      <h1>Weather</h1>
      <h1>hello</h1>
    </div>
  );
}

export default Weather;
