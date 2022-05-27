import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { MyContext } from "../../context/context";
import { CalendarClock } from "./CalendarClock";
import "react-clock/dist/Clock.css";
import Login from "../Register/Login";

function ToDo() {
  const { user, isUserLogin, userWeatherData, setUserWeatherData } =
    useContext(MyContext);
  const [value, onChange] = useState(new Date());

  let today = new Date().getHours();
  let time = "";

  if (today >= 0) {
    time = "Afternoon";
  }
  if (today >= 5) {
    time = "Morning";
  }
  if (today > 12) {
    time = "Afternoon";
  }
  if (today > 18) {
    time = "Evening";
  }
  if (today >= 23) {
    time = "Night";
  }

  function getLocation() {
    if (!navigator.geolocation) {
      console.log("Geolocation API not supported by this browser.");
    } else {
      console.log("Checking location...");
      navigator.geolocation.getCurrentPosition(success, error);
      console.log("already success");
    }
    function error() {
      console.log("Geolocation error!");
    }
    function success(position) {
      fetch(
        ` https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
      )
        .then((response) => response.json())
        .then((data) => (data ? setUserWeatherData(data) : console.log(data)));
    }
  }
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="Container">
      <div className="HeaderContainer">
        <h1>
          Good {time}
          {isUserLogin ? (
            <span> {user.loginUser.user.firstName.toUpperCase()}</span>
          ) : (
            ""
          )}
        </h1>

        <Login />
      </div>
      <div className="degreesDiv">
        <div className="DegreesIcon">
          <img
            src={`http://openweathermap.org/img/wn/${userWeatherData?.weather[0].icon}@2x.png`}
            alt=""
          />
          <div>
            <h2>{parseInt(userWeatherData?.main.temp)} C</h2>
            <h4>{userWeatherData?.name}</h4>
          </div>
        </div>

        <div className="CalendarClock">
          <CalendarClock />
        </div>
        <div className="Activities">
          <p>activities </p>
          <p>number/number</p>
        </div>
      </div>
      <div className="daysDiv">
        <Calendar onChange={onChange} value={value} className={["c1", "c2"]} />
      </div>
    </div>
  );
}

export default ToDo;
