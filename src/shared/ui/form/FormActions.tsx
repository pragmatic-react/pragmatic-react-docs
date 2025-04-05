import { useContext } from 'react';

import { Button } from '@shared/ui';

import { FormContext, useFormContext } from './FormContext';
import { FormResetProps, FormSubmitProps } from './types';

export const FormSubmit = ({ children, disabled }: FormSubmitProps) => {
  const context = useFormContext();

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
  const context = useFormContext();

  return (
    <Button type="button" onClick={context.onReset} disabled={disabled || context.isSubmitting} aria-label="폼 초기화">
      {children}
    </Button>
  );
};
