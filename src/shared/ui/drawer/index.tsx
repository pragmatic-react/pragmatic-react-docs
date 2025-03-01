import { useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const animationDuration = 300;

export const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    let closeTimeout: NodeJS.Timeout;

    if (isOpen) {
      dialog.showModal();

      requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return;
    }

    if (dialog.open) {
      setIsVisible(false);

      closeTimeout = setTimeout(() => {
        if (dialogRef.current && dialogRef.current.open) {
          dialogRef.current.close();
        }
      }, animationDuration);
    }

    return () => {
      if (closeTimeout) clearTimeout(closeTimeout);
    };
  }, [isOpen, animationDuration]);

  if (!isOpen && !isVisible && !dialogRef.current?.open) {
    return null;
  }

  return createPortal(
    <dialog ref={dialogRef} className="fixed inset-0 z-50 bg-transparent">
      {/* Backdrop */}
      <div
        className={`bg-black fixed inset-0 transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div
        className={`fixed inset-x-0 bottom-0 z-10 mx-auto w-full rounded-t-lg bg-white px-4 py-8 shadow-lg transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </dialog>,
    document.body,
  );
};
