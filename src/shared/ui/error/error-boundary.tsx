import React, { Component, PropsWithChildren, ReactNode, createContext, useContext } from 'react';

interface Props {
  fallback?: ReactNode | ((props: { handleReset: () => void }) => ReactNode);
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryContextType {
  setError: (error: Error) => void;
}

const ErrorBoundaryContext = createContext<ErrorBoundaryContextType>({
  setError: () => {},
});

export const useErrorBoundary = () => {
  return useContext(ErrorBoundaryContext);
};

export class ErrorBoundary extends Component<PropsWithChildren<Props>, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  setError = (error: Error) => {
    this.setState({ hasError: true, error });
  };

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback({ handleReset: this.handleReset });
      }
      return (
        this.props.fallback || (
          <div className="flex flex-col gap-4">
            <h2>불러오는 중 오류가 발생했습니다</h2>
            <p className="text-sm text-gray-600">{this.state.error?.message || '알 수 없는 오류가 발생했습니다.'}</p>
            <button onClick={this.handleReset} className="button--primary">
              다시 시도
            </button>
          </div>
        )
      );
    }

    return (
      <ErrorBoundaryContext.Provider value={{ setError: this.setError }}>
        {this.props.children}
      </ErrorBoundaryContext.Provider>
    );
  }
}
