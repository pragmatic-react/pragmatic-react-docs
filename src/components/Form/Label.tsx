import React from 'react';

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
  required?: boolean;
}

export default function Label({ children, htmlFor, required = false }: LabelProps) {
  return (
    <label className='text-sm font-medium text-gray-700' htmlFor={htmlFor}>
      {children}
      {required && <span className='text-red-500'>*</span>}
    </label>
  );
}
