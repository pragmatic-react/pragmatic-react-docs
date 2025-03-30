import { FormEvent, RefObject, useRef, useState } from "react";

interface Options<T> {
  validate?: (value: T) => boolean;
  initialValue?: T;
}

const useForm = <TFields extends string>() => {
  const fields = new Map<TFields, RefObject<any>>();
  const [errors, setErrors] = useState<Partial<Record<TFields, boolean>>>({});

  const register = <T>(field: TFields, options?: Options<T>) => {
    if (!fields.has(field)) {
      fields.set(field, useRef(options?.initialValue || null));
    }

    const validateField = () => {
      const ref = fields.get(field);
      if (ref?.current && options?.validate) {
        const isValid = options.validate(ref.current.value);

        setErrors((prev) => ({
          ...prev,
          [field]: !isValid,
        }));
      }
    };

    return {
      ref: fields.get(field),
      onChange: validateField,
      defaultValue: options?.initialValue,
    };
  };

  const onSubmit = (
    callback: (formData: Record<TFields, string>) => Promise<void>
  ) => {
    return async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData: Record<TFields, string> = {} as Record<TFields, string>;
      fields.forEach((ref, field) => {
        if (ref.current) {
          formData[field] = ref.current.value;
        }
      });

      try {
        await callback(formData);
      } catch (error) {
        console.error("API 호출 중 에러 발생:", error);
        throw error;
      }
    };
  };

  return {
    register,
    errors,
    onSubmit,
  };
};

export default useForm;
