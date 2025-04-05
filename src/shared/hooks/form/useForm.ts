import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';

type FieldValidator = (value: any) => void;

type UseFormOptions<T> = {
  initialValues: Partial<T>;
  onSubmit: (values: T) => void | Promise<void>;
  onReset?: () => void;
  validate?: (values: Partial<T>) => Record<keyof T, string>;
  requiredFields?: Array<keyof T>;
  validators?: Partial<Record<keyof T, FieldValidator>>;
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
  validators = {},
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

  const validateField = useCallback(
    (name: keyof T, value: any) => {
      let error = '';

      if (requiredFields.includes(name) && !value) {
        error = '필수 입력 필드입니다.';
      }

      if (!error && validators[name]) {
        try {
          validators[name]!(value);
        } catch (e) {
          error = e instanceof Error ? e.message : '유효성 검사에 실패했습니다.';
        }
      }

      if (!error && validate) {
        const validationErrors = validate({ ...values, [name]: value });
        error = validationErrors[name] || '';
      }

      if (error) {
        setFieldError(name, error);
      } else {
        clearFieldError(name);
      }
    },
    [validators, requiredFields, validate, values, setFieldError, clearFieldError],
  );

  const handleChange = useCallback(
    (name: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      setTouched((prev) => ({ ...prev, [name]: true }));
      validateField(name, value);
    },
    [validateField],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const allFieldErrors: Record<keyof T, string> = {} as Record<keyof T, string>;

        Object.keys(values).forEach((key) => {
          const fieldName = key as keyof T;
          const value = values[fieldName];

          if (requiredFields.includes(fieldName) && !value) {
            allFieldErrors[fieldName] = '필수 입력 필드입니다.';
          } else if (validators[fieldName]) {
            try {
              validators[fieldName]!(value);
            } catch (e) {
              allFieldErrors[fieldName] = e instanceof Error ? e.message : '유효성 검사에 실패했습니다.';
            }
          }
        });

        if (validate) {
          const validationErrors = validate(values);
          Object.assign(allFieldErrors, validationErrors);
        }

        if (Object.keys(allFieldErrors).length > 0) {
          setErrors(allFieldErrors);
          setIsSubmitting(false);
          return;
        }

        await onSubmit(values as T);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit, validate, validators, requiredFields],
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
