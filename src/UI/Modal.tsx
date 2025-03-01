import { useState } from "react";
import { createPortal } from "react-dom";

export type ModalType = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

const Modal = ({ children, title, open, onClose }: ModalType) => {
  return createPortal(
    <div className={`modal ${open ? "modal--open" : ""}`}>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-container">
        {title && <h2 className="modal-title text-title">{title}</h2>}
        {children}
        <div className="button-container">
          <button
            className="button button--primary text-caption"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
