import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export type ModalType = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}>;

const Modal = ({ children, title, isOpen, onClose }: ModalType) => {
  return createPortal(
    <div className={`modal ${isOpen ? "modal--open" : ""}`}>
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
