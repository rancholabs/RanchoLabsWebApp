import React, { useState } from 'react';
import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

function MyVerticallyCenteredModal(props) {

  const message = props.message

  return (
    <div className="popup">
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {message.blue}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {message.white}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}

function App(props) {
  const history = useHistory()
  const message = props.message
  const [modalShow, setModalShow] = React.useState(true);
  const clickHandler = (to) => {
    setModalShow(false)
    history.replace(to)
  }

  return (
    <div className="popup">
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => clickHandler(message.linkto)}
        message = {message}
      />
    </div>
  );
}

export default App