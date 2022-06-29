import React, { useEffect, useState } from "react";
import Clock from "react-clock";

export function CalendarClock() {
  const [value, setValue] = useState(new Date());
  const [clockTime, setClockTime] = useState();

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    // console.log(value.toString().slice(16, 27));
    const intervalTime = setInterval(() =>
      setClockTime(new Date().toString().slice(16, 27))
    );

    return () => {
      clearInterval(interval, intervalTime);
    };
  }, []);

  return (
    <div className="ClockContainer">
      <Clock value={value} hourHandWidth={4} />
      <h1>{clockTime}</h1>
    </div>
  );
}
