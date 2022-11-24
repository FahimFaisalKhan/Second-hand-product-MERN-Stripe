import React, { useState } from "react";
import { Button, Modal } from "react-daisyui";

const BookingModal = ({ visible, toggleVisible }) => {
  return (
    <div className="font-sans">
      <Modal open={visible}>
        <Button
          size="sm"
          shape="circle"
          className="absolute right-2 top-2"
          onClick={toggleVisible}
        >
          ✕
        </Button>
        <Modal.Header className="font-bold">
          Congratulations random Interner user!
        </Modal.Header>

        <Modal.Body>
          You've been selected for a chance to get one year of subscription to
          use Wikipedia for free!
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookingModal;
