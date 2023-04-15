import { useMutation } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CREATE_USER } from "../../graphql/Mutations";

function Signup() {
  const navigate = useNavigate();
  const [addUser, { loading, error }] = useMutation(CREATE_USER);
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
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Account Created",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/login");
      }
    });
  };
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
  return (
    <div className="Signup">
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
              <p>Register to use full version of Calendar</p>
              <form onSubmit={addUserForm}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    className="form-control form-control-lg"
                    required
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    className="form-control form-control-lg"
                    required
                  />
                </div>
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
                    value="Signup"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="text-center ">
            <Link className="btn btn-primary btn-lg btn-block me-2" to="/">
              Home
            </Link>
            <Link className="btn btn-primary btn-lg btn-block ms-2" to="/login">
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
