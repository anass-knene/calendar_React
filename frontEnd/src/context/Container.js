import React, { useEffect, useState } from "react";
import { MyContext } from "./context";
import { useNavigate } from "react-router-dom";

function Container({ children }) {
  const [user, setUser] = useState({});

  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userWeatherData, setUserWeatherData] = useState();
  const [LoginInputStyle, setLoginInputStyle] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        query: `query{
          getVerify{ 
          user{
          id 
          firstName
          lastName 
          email
         todoList {
           id
        activityDate
        activityName
        activityDetails
        startTime
        endTime
          
        }
    }
  }
}`,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data.getVerify) {
          // console.log(result);
          setUser(result.data.getVerify.user);
          setIsUserLogin(true);
        } else {
          navigate("/");
        }
      });
  }, []);

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        isUserLogin,
        setIsUserLogin,
        userWeatherData,
        setUserWeatherData,
        LoginInputStyle,
        setLoginInputStyle,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default Container;
