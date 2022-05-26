import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MyContext } from "../../context/context";
import { CREATE_USER, LOGIN_USER } from "../../graphql/Mutations";

function Login() {
  const navigate = useNavigate();
  const {
    setUser,
    setIsUserLogin,
    userLocation,
    setUserLocation,
    setUserWeatherData,
  } = useContext(MyContext);

  const [loginUser, { data1, loading1, error1 }] = useMutation(LOGIN_USER);
  const [addUser, { data, loading, error }] = useMutation(CREATE_USER);
  // const locationUser = () => {
  //   if (!navigator.geolocation) {
  //     console.log("Geolocation API not supported by this browser.");
  //   } else {
  //     console.log("Checking location...");
  //     navigator.geolocation.getCurrentPosition(success, error);
  //     console.log(success);
  //   }

  //   function success(position) {
  //     setUserLocation({
  //       Latitude: position.coords.latitude,
  //       Longitude: position.coords.longitude,
  //     });
  //     // console.log(position.coords.latitude);
  //   }
  // };

  const addUserForm = (e) => {
    e.preventDefault();

    addUser({
      variables: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        password: e.target.password.value,
      },
    }).then((res) => {
      if (res) {
        setUser(res.data);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Account Created",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  if (loading) return <h1>...loading</h1>;

  const loginUserForm = (e) => {
    e.preventDefault();

    loginUser({
      variables: {
        email: e.target.email.value,
        password: e.target.password.value,
      },
    }).then((res) => {
      if (res.data) {
        setUser(res.data);
        localStorage.setItem("token", res.data.loginUser.token);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 2000,
          customClass: "swal-width",
        });
        setIsUserLogin(true);
        navigate("/todo");
        // fetch(
        //   ` https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.Latitude}&lon=${userLocation.Longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
        // )
        //   .then((response) => response.json())
        //   .then((data) =>
        //     data ? setUserWeatherData(data) : console.log(data)
        //   );
      }
    });
  };

  return (
    <div className="Main">
      <input type="checkbox" id="chk" />

      <div className="Signup">
        <form onSubmit={addUserForm}>
          <label htmlFor="chk" aria-hidden="true">
            Sign up
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            required=""
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            required=""
          />

          <input type="email" name="email" placeholder="Email" required="" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required=""
          />
          <input type="submit" value="Sign Up" />
        </form>
      </div>

      <div className="Login">
        <form onSubmit={loginUserForm}>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input type="email" name="email" placeholder="Email" required="" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required=""
          />
          <input type="submit" value="Login" /* onClick={locationUser} */ />
        </form>
      </div>
    </div>
  );
}

export default Login;
