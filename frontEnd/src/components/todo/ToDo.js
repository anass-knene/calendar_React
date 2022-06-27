import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { MyContext } from "../../context/context";
import { CalendarClock } from "./CalendarClock";
import "react-clock/dist/Clock.css";

import TodoModal from "./TodoModal";
import LoginSignUp from "../Register/LoginSignUp";
import { useQuery } from "@apollo/client";
import { GET_ONE_USER } from "../../graphql/Queries";

function ToDo() {
  const { user, setUser, isUserLogin, userWeatherData, setUserWeatherData } =
    useContext(MyContext);

  const [value, onChange] = useState(new Date());

  const [modalShow, setModalShow] = useState(false);
  const { loading, error, data } = useQuery(GET_ONE_USER, {
    variables: { getOneUserId: user.id },
  });

  setTimeout(() => {
    if (data) {
      setUser(data.getOneUser);
    }
  }, 100);

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
      // console.log("Checking location...");
      navigator.geolocation.getCurrentPosition(success, error);
      // console.log("already success");
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
  function showModal() {
    setModalShow(true);
  }
  if (loading) {
    return (
      <img
        src="https://css-tricks.com/wp-content/uploads/2011/02/spinnnnnn.gif"
        loading="lazy"
        alt="img spinner"
      />
    );
  }
  const tileClassNameStyle = ({ date, view }) => {
    if (user.todoList.length > 0) {
      let styleIt = user.todoList.map((val) => {
        if (date.toDateString() === val.activityDate) {
          return "activityStyle";
        } else {
          return null;
        }
      });
      return styleIt;
    }
  };

  return (
    <div className="Container ">
      <div className="HeaderContainer pt-4">
        <h1 className="ms-1">
          Good {time}
          {isUserLogin ? <span> {user.firstName.toUpperCase()}</span> : ""}
        </h1>

        <LoginSignUp />
      </div>
      <div className="degreesDiv mt-4">
        {userWeatherData && (
          <div className="DegreesIcon">
            <img
              src={`http://openweathermap.org/img/wn/${userWeatherData?.weather[0].icon}@2x.png`}
              alt="img"
            />
            <div>
              <h2>{parseInt(userWeatherData?.main.temp)} C</h2>
              <h4>{userWeatherData?.name}</h4>
            </div>
          </div>
        )}

        <div className="CalendarClock">
          <CalendarClock />
        </div>
        <div className="Activities">
          <p>activities </p>
          <p>number/number</p>
        </div>
      </div>
      <div className="daysDiv">
        <Calendar
          onChange={onChange}
          value={value}
          // className={["c1", "c2"]}
          onClickDay={showModal}
          tileClassName={tileClassNameStyle}
        />
        <TodoModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          value={value}
        />
      </div>
    </div>
  );
}

export default ToDo;
