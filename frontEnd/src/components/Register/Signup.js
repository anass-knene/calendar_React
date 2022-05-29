import { useMutation } from "@apollo/client";
import React from "react";
import Swal from "sweetalert2";
import { CREATE_USER } from "../../graphql/Mutations";

function Signup() {
  const [addUser, { data, loading, error }] = useMutation(CREATE_USER);
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
        // setUser(res.data);
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
  if (error) return console.log(error);
  return (
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
  );
}

export default Signup;
