import { createContext } from 'react';

import { FormContextValue } from './types';

export const FormContext = createContext<FormContextValue<Record<string, any>> | null>(null);
