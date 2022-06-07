import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { MyContext } from "../../context/context";
import { ADD_TODO } from "../../graphql/Mutations";

function AddTodoModal(props) {
  let storeCalendarValue = props.value.toDateString();
  const { user } = useContext(MyContext);
  console.log(props.value.toDateString());
  const [addTodo, { loading, error }] = useMutation(ADD_TODO);
  if (loading) return <h1>...loading</h1>;
  const saveToDo = (e) => {
    e.preventDefault();
    console.log(storeCalendarValue);
    addTodo({
      variables: {
        activityDate: storeCalendarValue,
        activityName: e.target.activityName.value,
        startTime: e.target.start.value,
        endTime: e.target.end.value,
        activityDetails: e.target.activityDetails.value,
        createdBy: user.id,
      },
    }).then((res) => {
      if (res.data) {
        // setUser(res.data.loginUser.user);
        // localStorage.setItem("token", res.data.loginUser.token);
        // navigate("/");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "add success",
          showConfirmButton: false,
          timer: 1000,
          customClass: "swal-width",
        });
        // setIsUserLogin(true);
        // setLoginInputStyle(true);
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
    <div className="addTodoModalContainer">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form onSubmit={saveToDo}>
          <Modal.Header>
            <h3>Title</h3>
            <input type="text" name="activityName" placeholder="Title" />
          </Modal.Header>
          <Modal.Body className=" ">
            <div className="d-flex justify-content-between">
              <h4>Start Time</h4>

              <input type="time" name="start" placeholder="Start Time" />
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h4>End Time</h4>

              <input type="time" name="end" placeholder="End Time" />
            </div>
            <hr />
            <div className="text-center">
              <h4>Descriptions</h4>

              <textarea
                name="activityDetails"
                className="form-control"
                style={{ minWidth: "100%" }}
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button onClick={props.onHide}>Close</Button>
            <input className="btn btn-primary" type="submit" value="Save" />
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default AddTodoModal;
