import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';

type UseFormOptions<T> = {
  initialValues: Partial<T>;
  onSubmit: (values: T) => void | Promise<void>;
  onReset?: () => void;
  validate?: (values: Partial<T>) => Record<keyof T, string>;
  requiredFields?: Array<keyof T>;
};

export type UseFormResult<T> = {
  values: Partial<T>;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isError: boolean;
  handleChange: (
    name: keyof T,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  setFieldValue: (name: keyof T, value: any) => void;
  setFieldError: (name: keyof T, error: string) => void;
  clearFieldError: (name: keyof T) => void;
  setErrors: (errors: Record<keyof T, string>) => void;
};

export const useForm = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
  onReset,
  validate,
  requiredFields = [],
}: UseFormOptions<T>): UseFormResult<T> => {
  const [values, setValues] = useState<Partial<T>>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const clearFieldError = useCallback((name: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const handleChange = useCallback(
    (name: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      setTouched((prev) => ({ ...prev, [name]: true }));

      if (validate) {
        const validationErrors = validate({ ...values, [name]: value });
        if (validationErrors[name]) {
          setFieldError(name, validationErrors[name]);
        } else {
          clearFieldError(name);
        }
      }
    },
    [validate, setFieldError, clearFieldError],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        if (validate) {
          const validationErrors = validate(values);
          if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
          }
        }

        const missingFields = requiredFields.filter((key) => !values[key]);
        if (missingFields.length > 0) {
          const missingErrors = missingFields.reduce(
            (acc, key) => ({ ...acc, [key]: '필수 입력 필드입니다.' }),
            {} as Record<keyof T, string>,
          );
          setErrors(missingErrors);
          setIsSubmitting(false);
          return;
        }

        await onSubmit(values as T);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit, validate, requiredFields],
  );

  const handleReset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string>);
    setTouched({} as Record<keyof T, boolean>);
    onReset?.();
  }, [initialValues, onReset]);

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isError: Object.keys(errors).length > 0,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldError,
    clearFieldError,
    setErrors,
  };
};
