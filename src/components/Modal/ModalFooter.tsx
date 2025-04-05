import React from 'react';

function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className='mt-4 flex justify-end gap-2'>{children}</div>;
}

export default ModalFooter;
