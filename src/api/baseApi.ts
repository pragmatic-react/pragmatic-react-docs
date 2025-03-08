import axios from "axios";

const API_URL = "http://localhost:3000";

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
  UNKNOWN_ERROR: "알 수 없는 오류가 발생했습니다.",
  SERVER_ERROR: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
  NOT_FOUND: "요청한 데이터를 찾을 수 없습니다.",
  BAD_REQUEST: "잘못된 요청입니다.",
  UNAUTHORIZED: "인증이 필요합니다. 다시 로그인해주세요.",
  FORBIDDEN: "접근 권한이 없습니다.",
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    if (!error.response) {
      return Promise.reject(new Error(ERROR_MESSAGES.NETWORK_ERROR));
    }

    const { status, data } = error.response;

    let message = ERROR_MESSAGES.UNKNOWN_ERROR;
    if (status >= 500) {
      message = ERROR_MESSAGES.SERVER_ERROR;
    } else if (status === 404) {
      message = ERROR_MESSAGES.NOT_FOUND;
    } else if (status === 400) {
      message = data.message || ERROR_MESSAGES.BAD_REQUEST;
    } else if (status === 401) {
      message = ERROR_MESSAGES.UNAUTHORIZED;
    } else if (status === 403) {
      message = ERROR_MESSAGES.FORBIDDEN;
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
