import React from 'react';

interface ModalButtonProps {
  colorType: 'white' | 'orange';
  children: React.ReactNode;
  onClick: () => void;
}

function ModalButton({ children, onClick, colorType }: ModalButtonProps) {
  return (
    <button
      className={`w-full rounded-lg px-4 py-[10px] text-sm font-bold ${
        colorType === 'white' ? 'text-orange border-gray10 border bg-white' : 'bg-orange text-white'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ModalButton;
