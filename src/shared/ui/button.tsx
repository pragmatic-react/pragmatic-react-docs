import React, { ComponentPropsWithRef } from 'react';

import { cn } from '@shared/utils';

export const Button = ({ children, className, disabled, ...props }: ComponentPropsWithRef<'button'>) => {
  return (
    <button className={cn('button button--primary text-caption', disabled && 'button--disabled', className)} {...props}>
      {children}
    </button>
  );
};
