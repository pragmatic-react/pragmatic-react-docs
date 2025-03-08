type RequestConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string | null;
  credentials?: RequestCredentials;
  cache?: RequestCache;
};

type GetRequestOptions = {
  params?: Record<string, string | number>;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  cache?: RequestCache;
};

type Interceptor<T> = (data: T) => T;

export class Fetcher {
  private baseURL: string;
  private interceptors: {
    request: Interceptor<RequestConfig>;
    response: Interceptor<any>;
  };

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
    this.interceptors = {
      request: (config) => config,
      response: (response) => response,
    };
  }

  setBaseURL(baseURL: string): this {
    this.baseURL = baseURL;
    return this;
  }

  setInterceptor<T extends 'request' | 'response'>(
    type: T,
    handler: Interceptor<T extends 'request' ? RequestConfig : any>,
  ): this {
    this.interceptors[type] = handler as any;
    return this;
  }

  private buildQueryParams(params?: Record<string, string | number>): string {
    if (!params) return '';
    return '?' + new URLSearchParams(params as Record<string, string>).toString();
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: unknown,
    options?: GetRequestOptions,
  ): Promise<T> {
    try {
      let config: RequestConfig = {
        method,
        headers: { 'Content-Type': 'application/json', ...options?.headers },
        body: body ? JSON.stringify(body) : null,
        credentials: options?.credentials,
        cache: options?.cache,
      };

      config = this.interceptors.request(config);

      const queryString = method === 'GET' ? this.buildQueryParams(options?.params) : '';
      const response = await fetch(`${this.baseURL}${url}${queryString}`, config);

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const jsonResponse: T = await response.json();

      return this.interceptors.response(jsonResponse);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  get<T>(url: string, options?: GetRequestOptions): Promise<T> {
    return this.request<T>('GET', url, undefined, options);
  }

  post<T>(url: string, body: unknown): Promise<T> {
    return this.request<T>('POST', url, body);
  }

  put<T>(url: string, body: unknown): Promise<T> {
    return this.request<T>('PUT', url, body);
  }

  delete<T>(url: string): Promise<T> {
    return this.request<T>('DELETE', url);
  }
}
