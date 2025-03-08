import { css } from '@emotion/react';
import { PropsWithChildren, ReactNode } from 'react';

const footerStyle = css`
  display: flex;
`;

interface ModalFooterProps extends PropsWithChildren {}

// TODO:  as props 전달
export function ModalFooter({ children, ...props }: ModalFooterProps) {
  return (
    <footer css={footerStyle} {...props}>
      {children}
    </footer>
  );
}
