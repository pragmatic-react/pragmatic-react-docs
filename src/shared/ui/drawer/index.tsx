import { useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnEsc?: boolean;
};

const ANIMATION_DURATION = 300;

export const Drawer = ({ isOpen, onClose, children, closeOnEsc = true }: DrawerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // ESC 키 이벤트 처리
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) {
        onClose();
      }
    };

    if (isOpen && closeOnEsc) {
      window.addEventListener('keydown', handleEscKey);
      return () => window.removeEventListener('keydown', handleEscKey);
    }
  }, [isOpen, closeOnEsc, onClose]);

  // 모달 열기/닫기 로직
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const clearTimeoutSafely = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    };

    if (isOpen) {
      clearTimeoutSafely();
      dialog.showModal();

      requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return;
    }
    if (dialog.open) {
      setIsVisible(false);

      // 애니메이션 완료 후 닫기
      timeoutRef.current = setTimeout(() => {
        if (dialogRef.current?.open) {
          dialogRef.current.close();
        }
      }, ANIMATION_DURATION);
    }

    return clearTimeoutSafely;
  }, [isOpen]);

  if (!isOpen && !isVisible && !dialogRef.current?.open) {
    return null;
  }

  return createPortal(
    <dialog ref={dialogRef} className="fixed inset-0 z-50 bg-transparent" onCancel={(e) => e.preventDefault()}>
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
