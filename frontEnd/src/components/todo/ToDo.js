import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { MyContext } from "../../context/context";
import { CalendarClock } from "./CalendarClock";

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

  // activities number code
  const findMatchDate = user?.todoList?.filter(
    (item) => item.activityDate === value.toDateString()
  );
  let num;
  if (findMatchDate) {
    const activityNum = findMatchDate.length;
    num = activityNum;
  }
  // ///////

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
    if (user) {
      if (user?.todoList?.length > 0) {
        let styleIt = user.todoList.map((val) => {
          if (date.toDateString() === val.activityDate) {
            return "activityStyle";
          } else {
            return "noActivityStyle";
          }
        });
        return styleIt;
      }
    }
  };

  return (
    <div className="Container ">
      <div className="HeaderContainer pt-4">
        <div className="ms-4">
          <p>Good {time}</p>
          {isUserLogin ? <span> {user.firstName.toUpperCase()}</span> : ""}
        </div>
        <LoginSignUp />
      </div>
      <div className="degreesDiv ">
        {userWeatherData && (
          <div className="DegreesIcon">
            <img
              src={`http://openweathermap.org/img/wn/${userWeatherData?.weather[0].icon}@2x.png`}
              alt="img"
            />
            <div className="tempLocation">
              <h2>{parseInt(userWeatherData?.main.temp)} C</h2>
              <h4>{userWeatherData?.name}</h4>
            </div>
          </div>
        )}

        <div className="CalendarClock">
          <CalendarClock />
        </div>
        {isUserLogin ? (
          <div className="Activities me-3 ">
            <p>Activities </p>
            <p>
              <span>{num}</span> Activity
            </p>
          </div>
        ) : (
          <div className="Activities me-3">
            <p>login for </p>
            <p>
              <span>Activities</span>
            </p>
          </div>
        )}
      </div>
      <div className="daysDiv">
        <Calendar
          onChange={onChange}
          value={value}
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
