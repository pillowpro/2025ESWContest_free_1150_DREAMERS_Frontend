import axios, { type AxiosInstance } from 'axios';

/**
 * Private API Client
 * 
 * 인증이 필요한 보호된 API 요청을 위한 axios 인스턴스
 * localStorage의 'ACCESS' 토큰을 자동으로 Bearer 헤더에 추가
 * 사용자 정보, 개인 데이터, 설정 등에 사용
 * 
 * Base URL: https://pillow.jiw.app
 * 
 * 사용 예시:
 * - 사용자 프로필: privateAPI.get('/user/profile')
 * - 개인 설정: privateAPI.put('/user/settings', settings)
 * - 개인 데이터: privateAPI.post('/user/data', data)
 * 
 * 자동 기능:
 * - 요청 시 ACCESS 토큰 자동 추가
 * - 401 에러 시 토큰 제거 및 로그인 페이지로 리다이렉트
 */
export const privateAPI: AxiosInstance = axios.create({
  baseURL: 'https://pillow.jiw.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - localStorage에서 ACCESS 토큰을 자동으로 추가
privateAPI.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('ACCESS');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log(`[Private API] ${config.method?.toUpperCase()} ${config.url} (with token)`);
    } else {
      console.warn(`[Private API] ${config.method?.toUpperCase()} ${config.url} (no token found)`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 401 에러 시 토큰 제거 및 로그인 페이지로 리다이렉트
privateAPI.interceptors.response.use(
  (response) => {
    console.log(`[Private API] Response: ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`[Private API] Error:`, error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('[Private API] Unauthorized - removing token and redirecting to login');
      localStorage.removeItem('ACCESS');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default privateAPI;