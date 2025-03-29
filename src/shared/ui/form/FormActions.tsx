import { useContext } from 'react';

import { Button } from '@shared/ui';

import { FormContext } from './FormContext';
import { FormResetProps, FormSubmitProps } from './types';

export const FormSubmit = ({ children, disabled }: FormSubmitProps) => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('FormSubmit은 Form 컴포넌트 내부에서 사용되어야 합니다.');
  }

  return (
    <Button
      type="submit"
      disabled={disabled || context.isSubmitting || Object.keys(context.errors).length > 0}
      aria-label="폼 제출"
    >
      {children}
    </Button>
  );
};

export const FormReset = ({ children, disabled }: FormResetProps) => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('FormReset은 Form 컴포넌트 내부에서 사용되어야 합니다.');
  }

  return (
    <Button type="button" onClick={context.onReset} disabled={disabled || context.isSubmitting} aria-label="폼 초기화">
      {children}
    </Button>
  );
};
