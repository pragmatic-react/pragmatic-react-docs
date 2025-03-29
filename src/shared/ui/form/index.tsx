import { type FormEvent, type ReactNode, createContext, useContext, useRef, useState } from 'react';

import { cn } from '@shared/utils';

import { Button } from '../button';

interface FormContextValue {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

const FormContext = createContext<FormContextValue | null>(null);

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onReset?: () => void;
}

export const Form = ({ children, onSubmit, onReset, name, ...props }: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setErrors({});
    onReset?.();
  };

  const value = {
    name,
    onSubmit,
    onReset: handleReset,
    errors,
    setErrors,
  };

  return (
    <FormContext.Provider value={value}>
      <form ref={formRef} onSubmit={onSubmit} name={name} id={name} role="form" aria-label={name} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

interface FormItemProps {
  children: ReactNode;
  name: string;
  label?: string;
  required?: boolean;
  error?: string;
}

export const FormItem = ({ children, name, label, required, error }: FormItemProps) => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('FormItem은 Form 컴포넌트 내부에서 사용되어야 합니다.');
  }

  const hasError = error || context.errors[name];

  return (
    <div className={cn('form-item', required && 'form-item--required', hasError && 'form-item--error')}>
      {label && (
        <label htmlFor={name} className="text-caption">
          {label}
        </label>
      )}
      {children}
      {hasError && (
        <span className="error-message" role="alert">
          {hasError}
        </span>
      )}
    </div>
  );
};

interface FormSubmitProps {
  children: ReactNode;
  disabled?: boolean;
}

export const FormSubmit = ({ children, disabled }: FormSubmitProps) => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('FormSubmit은 Form 컴포넌트 내부에서 사용되어야 합니다.');
  }

  return (
    <Button type="submit" disabled={disabled} aria-label="폼 제출">
      {children}
    </Button>
  );
};

interface FormResetProps {
  children: ReactNode;
  disabled?: boolean;
}

export const FormReset = ({ children, disabled }: FormResetProps) => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('FormReset은 Form 컴포넌트 내부에서 사용되어야 합니다.');
  }

  return (
    <Button type="button" onClick={context.onReset} disabled={disabled} aria-label="폼 초기화">
      {children}
    </Button>
  );
};

Form.Item = FormItem;
Form.Submit = FormSubmit;
Form.Reset = FormReset;
