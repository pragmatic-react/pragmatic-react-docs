import { useRef } from 'react';

import { FormReset, FormSubmit } from './FormActions';
import { FormContext } from './FormContext';
import { FormItem } from './FormItem';
import { FormContextValue, FormProps } from './types';

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
  };

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
