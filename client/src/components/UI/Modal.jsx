import React from "react";
import "../../styles/Modal.css";

export const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? "Modal active" : "Modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "ModalContainer active" : "ModalContainer"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
