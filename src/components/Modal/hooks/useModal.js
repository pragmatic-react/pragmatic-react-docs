// components/ModalContext.tsx
import { createContext, useContext } from "react";

export const ModalContext = createContext(null);

const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export default useModal;
