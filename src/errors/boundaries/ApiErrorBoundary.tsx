import { Component, ReactNode } from "react";
import { AxiosError, isAxiosError } from "axios";
import { ApiError } from "../type";
import { ERROR_CODES } from "../constants";

/**
 * API 별 fallback UI 컴포넌트를 정의합니다.
 */
const API_ERROR_FALLBACKS: Record<string, ReactNode> = {
  products: <p>Product Error UI</p>,
  users: <p>User Error UI</p>,
  orders: <p>Orders Error UI</p>,
  restaurants: <p>Restaurants Error UI</p>,
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: ApiError | null;
}

class ApiErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error | AxiosError) {
    // axios error가 아니거나 네트워크 에러인 경우 글로벌 에러 바운더리로 전파합니다.
    if (!isAxiosError(error) || error.code === ERROR_CODES.NETWORK_ERROR)
      throw error;

    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { apiKey, response } = this.state.error as ApiError;
      const ErrorComponent = API_ERROR_FALLBACKS[apiKey];

      return (
        <>
          {ErrorComponent}
          <h1>{response?.statusText}</h1>
        </>
      );
    }

    return this.props.children;
  }
}

export default ApiErrorBoundary;
