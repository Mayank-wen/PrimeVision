import React from "react";
import styled from "styled-components";

const Modal = ({ message, onClose }) => {
  return (
    <ModalWrapper>
      <div className="modal-content">
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    width: 300px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #007bff;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

export default Modal;
