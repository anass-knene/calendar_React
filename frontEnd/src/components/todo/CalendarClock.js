import React, { useEffect, useState } from "react";
import Clock from "react-clock";

export function CalendarClock() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="ClockContainer">
      <Clock value={value} hourHandWidth={4} />
      <div className="ClockDateDiv">
        <h1>{value.toLocaleString().slice(10)}</h1>
        <h2>{value.toLocaleString().slice(0, 8)}</h2>
      </div>
    </div>
  );
}
