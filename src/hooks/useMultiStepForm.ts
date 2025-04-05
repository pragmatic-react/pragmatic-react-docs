import { use, useEffect, useState } from 'react';
import { ExtendedFieldConfig, FormConfig, useForm } from './useForm';

interface useMultiStepFormProps<T> {
  steps: number;
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  fields: Record<string, ExtendedFieldConfig<T>>;
  initialValue?: T;
}

export function useMultiStepForm<T>({
  steps,
  initialValues,
  onSubmit,
  fields,
}: useMultiStepFormProps<T>) {
  // 현재 단계 추적
  const [currentStep, setCurrentStep] = useState(0);
  // 전체 폼 데이터 유지를 위한 state
  const [formData, setFormData] = useState<T>(initialValues);

  const { register, handleSubmit, errors, resetForm } = useForm<T>({
    fields,
    onSubmit: async (values) => {
      if (currentStep === steps - 1) {
        // 최종 제출
        const finalFormData = {
          ...formData,
          ...values,
        };
        await onSubmit(finalFormData);
        // useEFFECT 대신 error 처리 함수 추가
        resetMultiStepForm();
      } else {
        // 중간 단계에서는 현재 데이터를 저장하고 다음으로 이동
        setFormData((prev) => ({
          ...prev,
          ...values,
        }));
        setCurrentStep((prev) => prev + 1);
      }
    },
  });

  console.log('errors', errors);
  // 다음 단계로 이동
  const nextStep = async () => {
    // 현재 폼 데이터를 가져와서 저장
    const formElements = document.forms[0].elements;
    const currentValues: any = {};

    Object.keys(fields).forEach((fieldName) => {
      const element = formElements.namedItem(fieldName) as HTMLInputElement;
      if (element) {
        currentValues[fieldName] = element.value;
      }
    });

    // 현재 데이터 저장
    setFormData((prev) => ({
      ...prev,
      ...currentValues,
    }));

    if (currentStep < steps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // 이전 단계로 이동
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // 특정 단계로 이동
  const goToStep = (step: number) => {
    if (step >= 0 && step < steps) {
      setCurrentStep(step);
    }
  };

  // 폼 초기화
  const resetMultiStepForm = () => {
    resetForm();
    setFormData(initialValues);
    setCurrentStep(0);
  };

  // register 함수를 확장하여 저장된 값을 기본값으로 설정
  const extendedRegister = (name: string) => {
    const baseRegister = register(name);
    return {
      ...baseRegister,
      defaultValue: formData[name as keyof T] || baseRegister.defaultValue,
    };
  };

  useEffect(() => {
    // errors 처리 해당 에러가 있으면 해당 에러의 Field의 step을 찾아 간다
    const errorField = Object.keys(errors).find((error) => errors[error]);
    if (errorField) {
      const errorFieldIndex = Object.keys(fields).findIndex((field) => field === errorField);
      setCurrentStep(errorFieldIndex);
    }
  }, [errors]);

  return {
    currentStep,
    formData,
    errors,
    register: extendedRegister,
    handleSubmit,
    nextStep,
    prevStep,
    goToStep,
    resetMultiStepForm,
  };
}
