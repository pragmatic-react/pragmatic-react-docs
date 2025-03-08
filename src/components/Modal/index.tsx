import { ReactNode } from "react";
import { createPortal } from "react-dom";

import Title from "./Title";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import Button from "./Button";
import ButtonContainer from "./ButtonContainer";

import useBodyOverflowHidden from "./hooks/useBodyOverflowHidden";
import useKeyDown from "./hooks/useKeyDown";
import { ModalContext } from "./hooks/useModal";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ open, onClose, children }: ModalProps) {
  useKeyDown("Escape", onClose);
  useBodyOverflowHidden();

  if (!open) return null;

  return createPortal(
    <ModalContext.Provider value={{ open, onClose }}>
      <div className="modal modal--open">
        <div className="modal-backdrop" onClick={onClose}></div>

        <div className="modal-container">{children}</div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Title = Title;
Modal.Footer = Footer;
Modal.ButtonContainer = ButtonContainer;
Modal.Button = Button;

export default Modal;
