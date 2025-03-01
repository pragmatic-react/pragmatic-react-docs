import React, { useEffect } from 'react';
import Portal from '../Portal';
import DimmedLayer from './DimmedLayer';
import ModalFooter from './ModalFooter';
import ModalButton from './ModalButton';

function ModalTitle({ children }: { children: React.ReactNode }) {
  return <h2 className='text-lg font-bold'>{children}</h2>;
}
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
          {/* Modal Footer */}
        </div>
      </DimmedLayer>
    </Portal>
  );
}

export default Modal;

Modal.Footer = ModalFooter;
Modal.Button = ModalButton;
Modal.Title = ModalTitle;
