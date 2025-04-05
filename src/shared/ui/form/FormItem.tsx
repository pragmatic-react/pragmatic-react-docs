import React from 'react';

import { cn } from '@shared/utils';

import { useFormContext } from './FormContext';
import { FormItemProps } from './types';

export const FormItem = ({ children, name, label, required, error }: FormItemProps) => {
  const context = useFormContext();
  const hasError = error || context.errors[name];

  const childElement = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement, {
        id: name,
        name,
        value: context.values[name] ?? '',
        onChange: context.handleChange(name),
        'aria-invalid': hasError ? 'true' : 'false',
        'aria-describedby': hasError ? `${name}-error` : undefined,
      })
    : children;

  return (
    <div className={cn('form-item', required && 'form-item--required', hasError && 'form-item--error')}>
      {label && (
        <label htmlFor={name} className="text-caption">
          {label}
        </label>
      )}
      {childElement}
      {hasError && (
        <span id={`${name}-error`} className="error-message" role="alert">
          {hasError}
        </span>
      )}
    </div>
  );
};
