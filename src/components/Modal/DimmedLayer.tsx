import React from 'react';

interface DimmedLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

function DimmedLayer({ children, onClick, className, ...props }: DimmedLayerProps) {
  return (
    <div
      className='z-overlay fixed top-0 left-0 h-full w-full bg-[rgba(0,_0,_0,_0.35)]'
      onClick={onClick}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export default DimmedLayer;
