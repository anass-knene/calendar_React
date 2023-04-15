import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/context";
import { HiOutlineLogin } from "react-icons/hi";

function LoginSignUp() {
  const {
    isUserLogin,
    setIsUserLogin,
    LoginInputStyle,
    setLoginInputStyle,
    setUser,
  } = useContext(MyContext);

  function logoutUserFunction() {
    localStorage.removeItem("token");
    setIsUserLogin(false);
    setUser({});
  }

  return (
    <div className="Login ">
      {!isUserLogin ? (
        <HiOutlineLogin
          size={35}
          className="react-icons"
          onClick={() => setLoginInputStyle(!LoginInputStyle)}
        />
      ) : (
        <input
          type="button"
          value="Sign out"
          className="logoutBtn"
          onClick={logoutUserFunction}
        />
      )}
      {!LoginInputStyle ? (
        <div className="me-4">
          <Link to="/login" className=" btn btn-primary me-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary ms-2">
            Signup
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default LoginSignUp;
