import axios, { type AxiosInstance } from 'axios';

/**
 * Public API Client
 * 
 * 인증이 필요하지 않은 공개 API 요청을 위한 axios 인스턴스
 * 회원가입, 로그인, 공개 데이터 조회 등에 사용
 * 
 * Base URL: https://pillow.jiw.app
 * 
 * 사용 예시:
 * - 회원가입: publicAPI.post('/auth/signup', userData)
 * - 로그인: publicAPI.post('/auth/login', credentials)
 * - 공개 데이터: publicAPI.get('/public/data')
 */
export const publicAPI: AxiosInstance = axios.create({
  baseURL: 'https://pillow.jiw.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 필요시 공통 헤더 추가
publicAPI.interceptors.request.use(
  (config) => {
    // 공통 요청 처리 로직 (필요시 추가)
    console.log(`[Public API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
publicAPI.interceptors.response.use(
  (response) => {
    console.log(`[Public API] Response: ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`[Public API] Error:`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default publicAPI;