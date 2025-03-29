import { RefObject, useRef, useState } from "react";

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

  return { register, errors };
};

export default useForm;
