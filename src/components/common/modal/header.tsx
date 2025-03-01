import { css } from '@emotion/react';
import { CommonModalProps } from '.';

const headerStyle = css`
  font: var(--text-title);
`;

export const closeButtonStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

interface ModalHeaderProps extends Omit<CommonModalProps, 'isOpen'> {
  showCloseButton?: boolean;
}

// TODO:  as props 전달
export function ModalHeader({
  children,
  onClose,
  showCloseButton = false,
  ...props
}: ModalHeaderProps) {
  return (
    <header css={headerStyle} {...props}>
      {children}
      {showCloseButton && (
        <button css={closeButtonStyle} onClick={onClose}>
          ✖
        </button>
      )}
    </header>
  );
}
