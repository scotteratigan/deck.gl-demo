import React from "react";
import "./Modal.scss";

export default function Modal({ isOpen, setIsOpen, children }) {
  return isOpen ? (
    <div className="modal-background">
      <div className="modal-container">
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
}
