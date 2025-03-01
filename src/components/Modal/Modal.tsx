import React, { useEffect } from 'react';
import Portal from '../Portal';
import DimmedLayer from './DimmedLayer';

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
  isOpen?: boolean;
}

function Modal({ closeModal, isOpen = true, children }: ModalProps) {
  useEffect(() => {
    // 스크롤을 막는다
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isOpen) return null;

  return (
    <Portal selector='#modal-root'>
      <DimmedLayer onClick={closeModal}>
        <div className='z-modal fixed bottom-0 mt-6 h-fit w-full rounded-t-lg bg-white px-4 py-8'>
          {children}
        </div>
      </DimmedLayer>
    </Portal>
  );
}

export default Modal;
