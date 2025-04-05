import React, { Component, PropsWithChildren, ReactNode } from 'react';

import { Button } from '../button';

interface Props {
  fallback?: ReactNode | ((props: { error: Error; handleReset: () => void }) => ReactNode);
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const DefaultErrorFallback = ({ error, handleReset }: { error: Error; handleReset: () => void }) => (
  <div className="flex flex-col items-center justify-center gap-4 p-4" role="alert" aria-live="polite">
    <h2 className="text-lg font-bold">오류가 발생했습니다</h2>
    <p className="text-sm text-gray-600">{error.message}</p>
    <Button onClick={handleReset} className="mt-4">
      다시 시도
    </Button>
  </div>
);

export class GlobalErrorBoundary extends Component<PropsWithChildren<Props>, State> {
  constructor(props: PropsWithChildren<Props>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      if (typeof fallback === 'function') {
        return fallback({ error, handleReset: this.handleReset });
      }

      if (fallback) {
        return fallback;
      }

      return <DefaultErrorFallback error={error} handleReset={this.handleReset} />;
    }

    return children;
  }
}
