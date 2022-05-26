import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import { MyContext } from "../../context/context";
import { CalendarClock } from "./CalendarClock";
import "react-clock/dist/Clock.css";

function ToDo() {
  const { user, isUserLogin, userWeatherData } = useContext(MyContext);
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
        {userWeatherData && (
          <img
            src={`http://openweathermap.org/img/wn/${userWeatherData.weather[0].icon}@2x.png`}
            alt=""
          />
        )}
      </div>
      <div className="degreesDiv">
        <div className="DegreesIcon">
          <img
            src={`http://openweathermap.org/img/wn/${userWeatherData.weather[0].icon}@2x.png`}
            alt=""
          />
          <div>
            <h2>{parseInt(userWeatherData.main.temp)} C</h2>
            <h4>{userWeatherData.name}</h4>
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

      {/* <div className="activitiesSections">
        <ul className="activitiesItems">
          <li>activities 1</li>
          <li>activities 2</li>
          <li>activities 3</li>
          <li>activities 4</li>
        </ul>
      </div> */}
    </div>
  );
}

export default ToDo;

// let days = [];
// function getDaysInMonth(month, year) {
//   let date = new Date(year, month, 1);
//   while (date.getMonth() === month) {
//     days.push(new Date(date));
//     date.setDate(date.getDate() + 1);
//   }
//   return days;
// }
// getDaysInMonth(4, 2022);
// console.log(days);
// let dayNum = [];
// let day = [];
// days.map((value) => {
//   dayNum.push(value.toString().split(" ").slice(0, 1));
//   day.push(value.toUTCString().split(" ").slice(1, 2));
//   return value;
//   // return dayNum;
// });
// console.log(dayNum);
// console.log(dayNum);
