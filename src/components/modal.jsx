import { createPortal } from "react-dom";

export default function Modal({ children, isOpen }) {
  if (!isOpen) return null;
  return createPortal(children, document.body);
}
