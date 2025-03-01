import { HTMLAttributes } from 'react';
import { defaultStyle, primaryStyle, secondaryStyle } from './style';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary';
}

export function Button({ color, children, ...props }: ButtonProps) {
  return (
    <button
      css={[
        defaultStyle,
        color === 'primary' ? primaryStyle : color === 'secondary' && secondaryStyle,
      ]}
      {...props}
    >
      {children}
    </button>
  );
}
