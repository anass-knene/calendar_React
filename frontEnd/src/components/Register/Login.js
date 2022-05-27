import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MyContext } from "../../context/context";
import { LOGIN_USER } from "../../graphql/Mutations";
import { HiOutlineLogin } from "react-icons/hi";
function Login() {
  const navigate = useNavigate();
  const { setUser, isUserLogin, setIsUserLogin } = useContext(MyContext);
  const [LoginInputStyle, setLoginInputStyle] = useState(false);
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  if (loading) return <h1>...loading</h1>;
  if (error)
    return Swal.fire({
      position: "top",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 2000,
      customClass: "swal-width",
    });

  const loginUserForm = (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        email: e.target.email.value,
        password: e.target.password.value,
      },
    }).then((res) => {
      console.log(res);
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
        setLoginInputStyle(true);
      }
    });
  };
  function logoutUserFunction() {
    localStorage.removeItem("token");
    setIsUserLogin(false);
  }

  return (
    <div className="Login">
      {!isUserLogin ? (
        <HiOutlineLogin
          className="react-icons"
          onClick={() => setLoginInputStyle(!LoginInputStyle)}
        />
      ) : (
        <input
          type="button"
          value="Logout"
          className="logoutBtn"
          onClick={logoutUserFunction}
        />
      )}
      {!isUserLogin ? (
        <>
          <form onSubmit={loginUserForm}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              style={
                LoginInputStyle ? { display: "none" } : { display: "block" }
              }
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              style={
                LoginInputStyle ? { display: "none" } : { display: "block" }
              }
            />
            <input
              type="submit"
              value="Login"
              style={
                LoginInputStyle ? { display: "none" } : { display: "block" }
              }
            />
            <input
              type="button"
              value="Signup "
              style={
                LoginInputStyle ? { display: "none" } : { display: "block" }
              }
            />
          </form>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Login;
