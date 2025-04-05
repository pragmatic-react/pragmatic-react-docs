import { useRef, useState } from 'react';
interface FieldConfig {
  required?: boolean;
  validate?: (value: any) => string | undefined;
  initialValue?: any;
}

interface FormConfig {
  fields: Record<string, FieldConfig>;
  onSubmit: (values: Record<string, any>) => Promise<void>;
}

export function useForm(config: FormConfig) {
  const refs = useRef<Record<string, HTMLElement>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const register = (name: string) => {
    return {
      ref: (element: HTMLElement | null) => {
        if (element) {
          refs.current[name] = element;
        }
      },
      defaultValue: config.fields[name]?.initialValue,
    };
  };

  const validateField = (name: string, value: any): string | undefined => {
    const field = config.fields[name];

    if (field?.required && !value) {
      return `${name} 필드는 필수입니다.`;
    }

    if (field?.validate) {
      return field.validate(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const values: Record<string, any> = {};
    const newErrors: Record<string, string> = {};
    let hasError = false;

    try {
      // 모든 필드 검증
      Object.keys(config.fields).forEach((name) => {
        const element = refs.current[name] as HTMLInputElement;
        const value = element?.value;
        values[name] = value;

        const error = validateField(name, value);
        if (error) {
          newErrors[name] = error;
          hasError = true;
        }
      });

      setErrors(newErrors);

      if (!hasError) {
        await config.onSubmit(values);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({
        form: '제출 중 오류가 발생했습니다.',
      });
    }
  };

  const resetForm = () => {
    Object.keys(config.fields).forEach((name) => {
      const element = refs.current[name] as HTMLInputElement;
      if (element) {
        element.value = config.fields[name]?.initialValue || '';
      }
    });
    setErrors({});
  };

  // useActionState 사용시 오류 발생 ... formData가 안 넘어옴
  // const [state, formAction, isPending] = useActionState(handleSubmit, {});

  return {
    register,
    handleSubmit,
    errors,
    resetForm,
  };
}
