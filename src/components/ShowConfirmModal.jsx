import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ShowConfirmModal = ({
  title,
  body,
  action,
  show,
  handleClose,
  handleAction,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAction}>
          {action}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowConfirmModal;
