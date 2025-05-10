import { ReactNode } from 'react';

type LoadingStateProps = {
  isLoading: boolean;
  fallback: ReactNode;
  children: ReactNode;
  'aria-label'?: string;
};

export const LoadingState = ({
  isLoading,
  fallback,
  children,
  'aria-label': ariaLabel = '로딩 중',
}: LoadingStateProps) => {
  if (isLoading) {
    return (
      <div role="status" aria-label={ariaLabel}>
        {fallback}
      </div>
    );
  }

  return <>{children}</>;
};
