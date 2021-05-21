import React from "react";
import "./styles.scss";

const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return (
    <>
      <div className='modalOverlayy' onClick={() => toggleModal()} />
      <div className='modalWrapp'>
        <div className='modall'>{children}</div>
      </div>
    </>
  );
};

export default Modal;
