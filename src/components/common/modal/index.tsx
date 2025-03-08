import { PropsWithChildren, useEffect } from 'react';
import { ModalHeader } from './header';
import { ModalBody } from './body';
import { ModalFooter } from './footer';
import { modalContainerStyle, modalDefaultStyle, overlayStyle } from './style';
import { createPortal } from 'react-dom';

export type PlacementType = 'top' | 'center' | 'bottom';

export interface CommonModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose?: () => void;
  placement?: PlacementType;
}

// TODO: dialog 태그 사용
export function Modal({ isOpen, onClose, placement = 'center', children }: CommonModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div css={modalDefaultStyle(isOpen)} role="dialog">
      <div css={overlayStyle} onClick={onClose} />
      <div css={modalContainerStyle(placement)} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!,
  );
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
