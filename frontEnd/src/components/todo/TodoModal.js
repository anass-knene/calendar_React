import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Modal } from "react-bootstrap";

function TodoModal(props) {
  const addTodoBtn = () => {
    props.onHide();
    console.log("hello");
  };
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={addTodoBtn}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TodoModal;
