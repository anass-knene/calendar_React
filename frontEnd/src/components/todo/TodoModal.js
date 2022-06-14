import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";
import AddTodoModal from "./AddTodoModal";
import { MyContext } from "../../context/context";
import { useMutation } from "@apollo/client";
import { UPDATE_TODO } from "../../graphql/Mutations";
function TodoModal(props) {
  const { user } = useContext(MyContext);
  const [modalShow1, setModalShow1] = useState(false);
  const [editBtn, setEditBtn] = useState(false);
  const [updateTodoInput, setUpdateTodoInput] = useState();
  const [updateTodo, { data, loading, error }] = useMutation(UPDATE_TODO);

  const updateTodoForm = (e, id) => {
    e.preventDefault();
    if (editBtn) {
      console.log("1");
      let activityName, startTime, endTime, activityDetails;
      // if (
      //   e.target.activityDate.value !== undefined &&
      //   e.target.activityDate.value !== ""
      // ) {
      //   activityDate = e.target.activityDate.value;
      // }
      if (
        e.target.activityName.value !== undefined &&
        e.target.activityName.value !== ""
      ) {
        activityName = e.target.activityName.value;
        console.log(activityName);
      }
      if (
        e.target.startTime.value !== undefined &&
        e.target.startTime.value !== ""
      ) {
        startTime = e.target.startTime.value;
        console.log(startTime);
      }
      if (
        e.target.endTime.value !== undefined &&
        e.target.endTime.value !== ""
      ) {
        endTime = e.target.endTime.value;
        console.log(endTime);
      }
      if (
        e.target.activityDetails.value !== undefined &&
        e.target.activityDetails.value !== ""
      ) {
        activityDetails = e.target.activityDetails.value;
        console.log(activityDetails);
      }
      if (
        // activityDate !== e.target.activityDate.value &&
        activityName !== e.target.activityName.value &&
        startTime !== e.target.startTime.value &&
        endTime !== e.target.endTime.value &&
        activityDetails !== e.target.activityDetails.value
      ) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "nothing change",
          showConfirmButton: false,
          timer: 1000,
        });
        // return props.onHide();
      }

      // props.onHide();
      updateTodo({
        variables: {
          updateTodoId: updateTodoInput,
        },
      });
    } else {
      e.preventDefault();
      setEditBtn(!editBtn);
      setUpdateTodoInput(id);
      return;
    }
  };

  // /////////
  const addTodoBtn = () => {
    setModalShow1(true);
    props.onHide();
  };
  // /////////
  let arr = [];
  if (user.todoList) {
    for (let i = 0; i < user.todoList.length; i++) {
      const element = user.todoList[i];
      if (element.activityDate === props.value.toDateString()) {
        arr.push(element);
      }
    }
  }
  // //////
  return (
    <div>
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="d-flex justify-content-between bg-primary p-4 text-white">
          <h1 className="text-center ">{props.value.toDateString()}</h1>
          <input
            type="button"
            value="+"
            className="btn btn-light btn-lg btn-block text-primary fs-4"
            onClick={addTodoBtn}
          />
        </div>
        {arr &&
          arr.map((todo) => {
            return (
              <div key={todo.id}>
                <form onSubmit={updateTodoForm}>
                  <Modal.Header>
                    <h3>Title</h3>
                    {updateTodoInput === todo.id && editBtn ? (
                      <input
                        type="text"
                        name="activityName"
                        placeholder={todo.activityName}
                      />
                    ) : (
                      <h3>{todo.activityName}</h3>
                    )}
                  </Modal.Header>
                  <Modal.Body className=" ">
                    <div className="d-flex justify-content-between">
                      <h4>Start Time</h4>
                      {updateTodoInput === todo.id && editBtn ? (
                        <input
                          type="text"
                          placeholder={todo.startTime}
                          name="startTime"
                        />
                      ) : (
                        <h4>{todo.startTime}</h4>
                      )}
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <h4>End Time</h4>
                      {updateTodoInput === todo.id && editBtn ? (
                        <input
                          type="text"
                          placeholder={todo.endTime}
                          name="endTime"
                        />
                      ) : (
                        <h4>{todo.endTime}</h4>
                      )}
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <h4>Descriptions</h4>
                      {updateTodoInput === todo.id && editBtn ? (
                        <input
                          type="text"
                          placeholder={todo.activityDetails}
                          name="activityDetails"
                        />
                      ) : (
                        <h4>{todo.activityDetails}</h4>
                      )}
                    </div>
                  </Modal.Body>
                  <hr />

                  {updateTodoInput === todo.id && editBtn ? (
                    <div className="d-flex justify-content-center bg-light p-5">
                      <input
                        className=" btn btn-primary"
                        type="Submit"
                        defaultValue="Save"
                      />

                      <input
                        className=" ms-4 btn-dark "
                        style={{ width: "60px", borderRadius: "5px" }}
                        type="button"
                        value="X"
                        onClick={() => {
                          setUpdateTodoInput(todo.id);
                          setEditBtn(!editBtn);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center bg-light p-5">
                      <input
                        className=" btn btn-primary me-4  "
                        id="editBtnId"
                        type="button"
                        defaultValue="Edit"
                        onClick={(e) => updateTodoForm(e, todo.id)}
                      />
                      <input
                        type="button"
                        value="Delete"
                        className="btn btn-danger ms-4"
                      />
                    </div>
                  )}
                </form>
              </div>
            );
          })}

        <Modal.Footer className="d-flex justify-content-center ">
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      <AddTodoModal
        show={modalShow1}
        onHide={() => setModalShow1(false)}
        value={props.value}
      />
    </div>
  );
}

export default TodoModal;
