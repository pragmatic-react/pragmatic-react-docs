const BASE_URL = "http://localhost:3000";
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = 10000000
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  await delay(3000);

  return fetch(url, { ...options, signal: controller.signal })
    .then((response) => response.json())
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("요청이 중단되었습니다.");
      } else {
        console.error("기타 오류 발생:", error);
      }
      throw error;
    })
    .then((data) => {
      clearTimeout(timeoutId);
      return data;
    });
};

const fetchAPI = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  return fetchWithTimeout(`${BASE_URL}/${url}`, {
    headers: { ...DEFAULT_HEADERS, ...options.headers },
    ...options,
  });
};

const get = <T>(url: string) => {
  return fetchAPI<T>(url);
};

const post = <T>(url: string, bodyData: object) => {
  return fetchAPI<T>(url, { method: "POST", body: JSON.stringify(bodyData) });
};

const https = {
  get,
  post,
};

export default https;
