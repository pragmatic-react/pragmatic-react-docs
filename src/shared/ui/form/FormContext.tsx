import { createContext, useContext } from 'react';

import { FormContextValue } from './types';

export const FormContext = createContext<FormContextValue<Record<string, any>> | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('FormContext를 찾을 수 없습니다.');
  }
  return context;
};
