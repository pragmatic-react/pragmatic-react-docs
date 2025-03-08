import { Fetcher } from './baseFetcher';

const getBaseUrl = () => {
  const BASE_URL = import.meta.env.VITE_API_URL ?? '';

  if (!BASE_URL) {
    throw new Error('API_URL is not set');
  }

  return BASE_URL;
};

const BASE_URL = getBaseUrl();

export const fetcher = new Fetcher().setBaseURL(BASE_URL);
