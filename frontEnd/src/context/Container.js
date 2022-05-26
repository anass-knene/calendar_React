import React, { useEffect, useState } from "react";
import { MyContext } from "./context";
import { useNavigate } from "react-router-dom";

function Container({ children }) {
  const [user, setUser] = useState({});
  const [isUserLogin, setIsUserLogin] = useState(false);
  const navigate = useNavigate();

  fetch(
    ` https://api.openweathermap.org/data/2.5/weather?q=damascus&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => console.log(data, "hello"));

  useEffect(() => {
    fetch("https:localhost:5000/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        query: `query {
  getVerify{ 
    user{
      id 
      firstName
      lastName 
      email
    }
  }
}`,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data.getVerify) {
          setUser(result.data.getVerify.user);
          setIsUserLogin(true);
        } else {
          navigate("/login");
        }
      });
  }, []);
  return (
    <MyContext.Provider value={{ user, setUser, isUserLogin, setIsUserLogin }}>
      {children}
    </MyContext.Provider>
  );
}

export default Container;
