import { PropsWithChildren } from 'react';

interface ModalBodyProps extends PropsWithChildren {}

export function ModalBody({ children, ...props }: ModalBodyProps) {
  return <section {...props}>{children}</section>;
}
