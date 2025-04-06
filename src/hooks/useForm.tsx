import React, { useState } from "react";

type ValidatorFn = (value: string) => string | null;

interface FieldValidators {
  [key: string]: ValidatorFn[];
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validators: FieldValidators
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    {} as any
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors: Record<string, string | null> = {};
    for (const field in validators) {
      for (const validator of validators[field]) {
        const error = validator(values[field]);
        if (error) {
          newErrors[field] = error;
          break; // 첫 번째 에러만
        }
      }
    }
    setErrors(newErrors as any);
    return Object.values(newErrors).every((error) => error === null);
  };

  const handleSubmit =
    (onValid: (data: T) => Promise<void>) => async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      setIsSubmitting(true);
      try {
        await onValid(values);
        setValues(initialValues); // reset
      } finally {
        setIsSubmitting(false);
      }
    };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
