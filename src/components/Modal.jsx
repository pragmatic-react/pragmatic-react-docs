import { useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ open, onClose, children, title }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!open) return null;

  return createPortal(
    <div className="modal modal--open">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-container">
        {title && <h2 className="modal-title text-title">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body
  );
}
export default Modal;
