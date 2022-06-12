import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Modal } from "react-bootstrap";
import AddTodoModal from "./AddTodoModal";
import { MyContext } from "../../context/context";
function TodoModal(props) {
  const { user } = useContext(MyContext);
  const [modalShow1, setModalShow1] = useState(false);
  const [editBtn, setEditBtn] = useState(false);
  const [updateTodoInput, setUpdateTodoInput] = useState();
  const updateTodoForm = (e) => {
    e.preventDefault();

    console.log(e.target.activityName.value);
    console.log(editBtn);
  };

  const editBtnForm = (id) => {
    setEditBtn(!editBtn);
    setUpdateTodoInput(id);
  };

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
                        className=" btn btn-primary ms-4  "
                        id="editBtnId"
                        type="button"
                        defaultValue="Edit"
                        onClick={() => editBtnForm(todo.id)}
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
