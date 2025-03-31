import { FormEvent, useRef, useState } from "react";

interface Options<T> {
  validate?: (value: T) => string | undefined; // undefined는 validate 통과한 상태
  initialValue?: T;
  isRequired?: boolean;
}

const useForm = <TFields extends string>() => {
  const fields = useRef<Map<TFields, HTMLInputElement | null>>(new Map()); // useRef로 필드 관리
  const fieldOptions = useRef<Map<TFields, Options<any>>>(new Map()); // useRef로 옵션 관리
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<TFields, string>>
  >({});
  const [formErrorMessage, setFormError] = useState<string | null>(null);

  const validateField = (field: TFields) => {
    const ref = fields.current.get(field);
    const fieldOption = fieldOptions.current.get(field);

    if (ref) {
      const value = ref.value;
      const isRequired = fieldOption?.isRequired;

      // 필수 필드만 유효성 검사
      const errorMessage =
        isRequired && value.trim() === ""
          ? "필수 입력 항목입니다."
          : fieldOption?.validate
          ? fieldOption.validate(value)
          : undefined;

      setFieldErrors((prev) => ({
        ...prev,
        [field]: errorMessage,
      }));
    }
  };

  const register = <T>(field: TFields, options?: Options<T>) => {
    if (!fields.current.has(field)) {
      fields.current.set(field, null);
      fieldOptions.current.set(field, options || {});
    }

    return {
      ref: (el: HTMLElement | null) => {
        if (el instanceof HTMLInputElement || el === null) {
          fields.current.set(field, el);
        }
      },
      onChange: () => validateField(field),
      defaultValue: options?.initialValue,
    };
  };

  const onSubmit = (
    callback: (formData: Record<TFields, string>) => Promise<void>
  ) => {
    return async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      fields.current.forEach((_, field) => validateField(field));

      if (!checkFormValidity()) {
        setFormError("폼 유효성 검사 실패했습니다.");
        return;
      }

      const formData: Record<TFields, string> = {} as Record<TFields, string>;
      fields.current.forEach((ref, field) => {
        if (ref) {
          formData[field] = ref.value;
        }
      });

      try {
        await callback(formData);
      } catch (error) {
        console.error("API 호출 중 에러 발생:", error);
        setFormError("제출 중 문제가 발생했습니다. 다시 시도해주세요.");
        throw error;
      }
    };
  };

  // 필수 필드가 모두 유효한지 확인하는 함수
  const checkFormValidity = () => {
    return Array.from(fields.current.keys()).every((field) => {
      const ref = fields.current.get(field);
      const options = fieldOptions.current.get(field);
      if (options?.isRequired) {
        const value = ref?.value.trim() || "";
        return value !== "" && !fieldErrors[field];
      }
      return true;
    });
  };

  return {
    register,
    fieldErrors,
    formErrorMessage,
    onSubmit,
    checkFormValidity,
  };
};

export default useForm;
