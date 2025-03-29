import { FormEvent, ReactNode, cloneElement, createContext, useContext, useRef } from 'react';
import React from 'react';

import { UseFormResult } from '@shared/hooks';
import { cn } from '@shared/utils';

import { Button } from '../button';

type FormContextValue<T extends Record<string, any>> = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  errors: Record<keyof T, string>;
  setErrors: (errors: Record<keyof T, string>) => void;
  values: Partial<T>;
  handleChange: (
    name: keyof T,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  setFieldError: (name: keyof T, error: string) => void;
  clearFieldError: (name: keyof T) => void;
};

const FormContext = createContext<FormContextValue<Record<string, any>> | null>(null);

type FormProps<T extends Record<string, any>> = {
  children: ReactNode;
  form: UseFormResult<T>;
  name: string;
  className?: string;
};

const FormComponent = <T extends Record<string, any>>({ children, form, name, className }: FormProps<T>) => {
  const formRef = useRef<HTMLFormElement>(null);

  const value = {
    name,
    onSubmit: form.handleSubmit,
    onReset: form.handleReset,
    errors: form.errors,
    setErrors: form.setErrors,
    values: form.values,
    handleChange: form.handleChange,
    touched: form.touched,
    isSubmitting: form.isSubmitting,
    setFieldError: form.setFieldError,
    clearFieldError: form.clearFieldError,
  } as FormContextValue<T>;

  return (
    <FormContext.Provider value={value as FormContextValue<Record<string, any>>}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit}
        name={name}
        id={name}
        role="form"
        aria-label={name}
        className={className}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

type FormItemProps = {
  children: ReactNode;
  name: string;
  label?: string;
  required?: boolean;
  error?: string;
  validator?: (value: any) => boolean | never;
};

type FormItemChildProps = {
  id?: string;
  name?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  'aria-invalid'?: string;
  'aria-describedby'?: string;
};

const FormItem = ({ children, name, label, required, error, validator }: FormItemProps) => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('FormItem은 Form 컴포넌트 내부에서 사용되어야 합니다.');
  }

  React.useEffect(() => {
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
    ? cloneElement(children as React.ReactElement<FormItemChildProps>, {
        id: name,
        name,
        value: context.values[name],
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

type FormSubmitProps = {
  children: ReactNode;
  disabled?: boolean;
};

const FormSubmit = ({ children, disabled }: FormSubmitProps) => {
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

type FormResetProps = {
  children: ReactNode;
  disabled?: boolean;
};

const FormReset = ({ children, disabled }: FormResetProps) => {
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

type FormType = typeof FormComponent & {
  Item: typeof FormItem;
  Submit: typeof FormSubmit;
  Reset: typeof FormReset;
};

export const Form: FormType = Object.assign(FormComponent, {
  Item: FormItem,
  Submit: FormSubmit,
  Reset: FormReset,
});
