import { ReactNode } from "react";
import useModal from "./hooks/useModal";

function Button({ children }: { children: ReactNode }) {
  const { onClose } = useModal();
  return (
    <button className="button button--primary text-caption" onClick={onClose}>
      {children}
    </button>
  );
}
export default Button;
