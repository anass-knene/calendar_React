import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/context";
import { HiOutlineLogin } from "react-icons/hi";

function LoginSignUp() {
  const { isUserLogin, setIsUserLogin, LoginInputStyle, setLoginInputStyle } =
    useContext(MyContext);

  // const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  // if (loading) return <h1>...loading</h1>;
  // if (error)
  //   return Swal.fire({
  //     position: "top",
  //     icon: "error",
  //     title: error,
  //     showConfirmButton: false,
  //     timer: 2000,
  //     customClass: "swal-width",
  //   });

  // const loginUserForm = (e) => {
  //   e.preventDefault();
  //   loginUser({
  //     variables: {
  //       email: e.target.email.value,
  //       password: e.target.password.value,
  //     },
  //   }).then((res) => {
  //     if (res.data) {
  //       setUser(res.data.loginUser.user);
  //       localStorage.setItem("token", res.data.loginUser.token);
  //       Swal.fire({
  //         position: "top",
  //         icon: "success",
  //         title: "Login successfully",
  //         showConfirmButton: false,
  //         timer: 2000,
  //         customClass: "swal-width",
  //       });
  //       setIsUserLogin(true);
  //       setLoginInputStyle(true);
  //     }
  //   });
  // };
  function logoutUserFunction() {
    localStorage.removeItem("token");
    setIsUserLogin(false);
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
          value="Logout"
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
