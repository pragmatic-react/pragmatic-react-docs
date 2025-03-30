import React from 'react';

interface ModalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorType: 'white' | 'orange';
  children: React.ReactNode;
}

function ModalButton({ children, colorType, type = 'button', ...props }: ModalButtonProps) {
  return (
    <button
      type={type}
      className={`w-full rounded-lg px-4 py-[10px] text-sm font-bold ${
        colorType === 'white' ? 'text-orange border-gray10 border bg-white' : 'bg-orange text-white'
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ModalButton;
