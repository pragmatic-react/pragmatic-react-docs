import { PropsWithChildren, createContext, useContext } from 'react';

import { useModalState } from '@shared/hooks';

type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const { isOpen, openModal, closeModal } = useModalState();

  return <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal은 ModalProvider 내부에서 사용되어야 합니다.');
  }
  return context;
};
