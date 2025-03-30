import { FormEvent, RefObject, useRef, useState } from "react";

interface Options<T> {
  validate?: (value: T) => string | undefined; // undefined는 validate 통과한 상태
  initialValue?: T;
  isRequired?: boolean;
}

const useForm = <TFields extends string>() => {
  const fields = new Map<TFields, RefObject<any>>();
  const fieldOptions = new Map<TFields, Options<any>>();
  const [errors, setErrors] = useState<Partial<Record<TFields, string>>>({});

  const register = <T>(field: TFields, options?: Options<T>) => {
    if (!fields.has(field)) {
      fields.set(field, useRef(options?.initialValue || null));
      fieldOptions.set(field, options || {});
    }

    const validateField = () => {
      const ref = fields.get(field);
      const fieldOption = fieldOptions.get(field);

      if (ref?.current) {
        const value = ref.current.value;
        const isRequired = fieldOption?.isRequired;

        // 필수 필드만 유효성 검사
        const errorMessage =
          isRequired && value.trim() === ""
            ? "필수 입력 항목입니다."
            : fieldOption?.validate
            ? fieldOption.validate(value)
            : undefined;

        setErrors((prev) => ({
          ...prev,
          [field]: errorMessage,
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

  // 필수 필드가 모두 유효한지 확인하는 함수
  const checkFormValidity = () => {
    return Array.from(fields.keys()).every((field) => {
      const ref = fields.get(field);
      const options = fieldOptions.get(field);
      if (options?.isRequired) {
        return ref?.current?.value.trim() !== "" && !errors[field];
      }
      return true;
    });
  };

  return {
    register,
    errors,
    onSubmit,
    checkFormValidity,
  };
};

export default useForm;
