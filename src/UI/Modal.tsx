import React, { createContext, useContext, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
export type ModalContextType = {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
};

type ModalProps = PropsWithChildren<ModalContextType>;

const initialState: ModalContextType = {
  isOpen: false,
};

const ModalContext = createContext<ModalContextType>(initialState);

export function Modal({ children, title, isOpen, onClose }: ModalProps) {
  return createPortal(
    <div className={`modal ${isOpen ? "modal--open" : ""}`}>
      <ModalContext.Provider value={{ isOpen, onClose, title }}>
        <div className="modal-backdrop" onClick={onClose}></div>
        <div className="modal-container">{children}</div>
      </ModalContext.Provider>
    </div>,
    document.body
  );
}

function Title() {
  const { title } = useContext(ModalContext);

  return <h2 className="modal-title text-title">{title}</h2>;
}

function CloseButton() {
  const { onClose } = useContext(ModalContext);
  return (
    <div className="button-container">
      <button className="button button--primary text-caption" onClick={onClose}>
        닫기
      </button>
    </div>
  );
}

Modal.Title = Title;
Modal.CloseButton = CloseButton;
