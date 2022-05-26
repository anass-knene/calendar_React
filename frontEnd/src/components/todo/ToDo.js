import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import { MyContext } from "../../context/context";
// import "react-calendar/dist/Calendar.css";

function ToDo() {
  // console.log(process.env);

  const { user, isUserLogin } = useContext(MyContext);
  const [value, onChange] = useState(new Date());

  let today = new Date().getHours();
  let time = "";
  if (today >= 0) {
    time = "Afternoon";
  }
  if (today >= 5) {
    time = "morning";
  }
  if (today >= 12) {
    time = "afternoon";
  }
  if (today > 6) {
    time = "evening";
  }
  console.log("====================================");
  console.log(today);
  console.log("====================================");
  return (
    <div className="Container">
      <div className="HeaderContainer">
        <h1>
          Good {time}{" "}
          {isUserLogin ? (
            <span>{user.loginUser.user.firstName.toUpperCase()}</span>
          ) : (
            ""
          )}
        </h1>
        <input type="button" className="addTodoBtn" value="+" />
      </div>
      <div className="degreesDiv">
        <div className="DegreesIcon">
          <span>Icon</span>
        </div>
        <div className="degreesDivInfo">
          <h2>number</h2>
          <p>locations</p>
          <p>activities number/number </p>
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
