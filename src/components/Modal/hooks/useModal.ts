import { createContext, useContext } from "react";

interface ModalContextType {
  open: boolean;
  onClose: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export default useModal;
