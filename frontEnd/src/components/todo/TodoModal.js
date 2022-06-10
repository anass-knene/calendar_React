import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Modal } from "react-bootstrap";
import AddTodoModal from "./AddTodoModal";
import { MyContext } from "../../context/context";
function TodoModal(props) {
  const { user } = useContext(MyContext);
  const [modalShow1, setModalShow1] = useState(false);
  let arr = [];
  const addTodoBtn = () => {
    setModalShow1(true);
    props.onHide();
  };
  if (user.todoList) {
    for (let i = 0; i < user.todoList.length; i++) {
      const element = user.todoList[i];
      if (element.activityDate === props.value.toDateString()) {
        arr.push(element);
      }
    }
  }

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
                <Modal.Header>
                  <h3>Title</h3>
                  <h3>{todo.activityName}</h3>
                </Modal.Header>
                <Modal.Body className=" ">
                  <div className="d-flex justify-content-between">
                    <h4>Start Time</h4>
                    <h4>{todo.startTime}</h4>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <h4>End Time</h4>
                    <h4>{todo.endTime}</h4>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <h4>Descriptions</h4>
                    <h4>{todo.activityDetails}</h4>
                  </div>
                </Modal.Body>
                <hr />
              </div>
            );
          })}

        <Modal.Footer className="d-flex justify-content-center">
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
