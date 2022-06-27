import { useMutation } from "@apollo/client";
import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MyContext } from "../../context/context";
import { LOGIN_USER } from "../../graphql/Mutations";

function Login() {
  const navigate = useNavigate();
  const { setUser, setIsUserLogin, setLoginInputStyle } = useContext(MyContext);
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
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
        setUser(res.data.loginUser.user);
        localStorage.setItem("token", res.data.loginUser.token);
        navigate("/");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1000,
          customClass: "swal-width",
        });
        setIsUserLogin(true);
        setLoginInputStyle(true);
      }
    });
  };
  if (error)
    Swal.fire({
      position: "top",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 2000,
      customClass: "swal-width",
    });

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="img"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <p>Login here if you have an account</p>
              <form onSubmit={loginUserForm}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-primary btn-lg btn-block "
                    value="Login"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="text-center ">
            <Link className="btn btn-primary btn-lg btn-block me-2" to="/">
              Home
            </Link>
            <Link
              className="btn btn-primary btn-lg btn-block ms-2"
              to="/signup"
            >
              Signup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
