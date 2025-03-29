import { FormEvent, ReactNode } from 'react';

import { UseFormResult } from '@shared/hooks';

export type FormContextValue<T extends Record<string, any>> = {
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

export type FormProps<T extends Record<string, any>> = {
  children: ReactNode;
  form: UseFormResult<T>;
  name: string;
  className?: string;
};

export type FormItemProps = {
  children: ReactNode;
  name: string;
  label?: string;
  required?: boolean;
  error?: string;
  validator?: (value: any) => boolean | never;
};

export type FormItemChildProps = {
  id?: string;
  name?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  'aria-invalid'?: string;
  'aria-describedby'?: string;
};

export type FormSubmitProps = {
  children: ReactNode;
  disabled?: boolean;
};

export type FormResetProps = {
  children: ReactNode;
  disabled?: boolean;
};
