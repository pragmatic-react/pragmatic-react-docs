import React, { useContext, useEffect } from 'react';

import { cn } from '@shared/utils';

import { FormContext } from './FormContext';
import { FormItemProps } from './types';

export const FormItem = ({ children, name, label, required, error, validator }: FormItemProps) => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('FormItem은 Form 컴포넌트 내부에서 사용되어야 합니다.');
  }

  useEffect(() => {
    const value = context.values[name];
    let validationError = '';

    if (required && !value) {
      validationError = '필수 입력 필드입니다.';
    } else if (validator) {
      try {
        validator(value);
      } catch (error) {
        validationError = error instanceof Error ? error.message : '유효성 검사에 실패했습니다.';
      }
    }

    if (validationError) {
      context.setFieldError(name, validationError);
    } else {
      context.clearFieldError(name);
    }
  }, [context.values[name], required, validator, context.setFieldError, context.clearFieldError, name]);

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
