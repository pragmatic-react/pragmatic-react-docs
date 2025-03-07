import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
client.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업
    // 예: 토큰 추가, 로깅 등
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
client.interceptors.response.use(
  (response) => {
    // 응답 데이터 가공이 필요한 경우
    return response.data;
  },
  (error) => {
    // 에러 응답 처리
    if (error.response) {
      // 서버가 응답을 반환한 경우
      switch (error.response.status) {
        case 400:
          error.message = '잘못된 요청입니다';
          break;
        case 404:
          error.message = '요청한 리소스를 찾을 수 없습니다';
          break;
        case 500:
          error.message = '서버 오류가 발생했습니다';
          break;
        default:
          error.message = '알 수 없는 오류가 발생했습니다';
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      error.message = '서버에 연결할 수 없습니다';
    }
    return Promise.reject(error);
  },
);
