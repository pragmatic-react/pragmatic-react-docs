import { createPortal } from "react-dom";

import Title from "./Title";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import Button from "./Button";
import ButtonContainer from "./ButtonContainer";

import useBodyOverflowHidden from "./hooks/useBodyOverflowHidden";
import useKeyDown from "./hooks/useKeyDown";

function Modal({ open, onClose, children }) {
  useKeyDown("Escape", onClose);
  useBodyOverflowHidden();

  if (!open) return null;

  return createPortal(
    <div className="modal modal--open">
      <div className="modal-backdrop" onClick={onClose}></div>

      <div className="modal-container">{children}</div>
    </div>,
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
