import axios, { type AxiosInstance } from 'axios';

/**
 * Device API Client
 * 
 * ESP32 BaegaePro 기기와의 통신을 위한 axios 인스턴스
 * 프로비저닝 모드에서 기기 설정, 상태 조회, WiFi 설정 등에 사용
 * 
 * Base URL: http://192.168.4.1 (AP 모드에서)
 * 
 * 주요 엔드포인트:
 * - GET /api/status - 기기 상태 조회
 * - GET /api/device-info - 상세 기기 정보
 * - POST /api/wifi-config - WiFi 설정 (ssid, password, token)
 * - POST /api/reset - 기기 리셋
 * 
 * 사용 예시:
 * - 상태 조회: const status = await deviceAPI.get('/api/status')
 * - WiFi 설정: await deviceAPI.post('/api/wifi-config', { ssid, password, token })
 * - 기기 정보: const info = await deviceAPI.get('/api/device-info')
 * - 기기 리셋: await deviceAPI.post('/api/reset')
 * 
 * 특징:
 * - 짧은 타임아웃 (5초) - 로컬 네트워크 최적화
 * - CORS 헤더 자동 추가
 * - 연결 실패 시 상세한 에러 로깅
 */
export const deviceAPI: AxiosInstance = axios.create({
  baseURL: 'http://192.168.4.1',
  timeout: 5000, // 짧은 타임아웃 - 로컬 기기 통신
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - CORS 및 ESP32 통신 최적화
deviceAPI.interceptors.request.use(
  (config) => {
    // ESP32 기기와의 통신 최적화
    config.headers['Access-Control-Allow-Origin'] = '*';
    console.log(`[Device API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - ESP32 기기 연결 실패 처리
deviceAPI.interceptors.response.use(
  (response) => {
    console.log(`[Device API] Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    // ESP32 기기 연결 실패 시 상세한 처리
    if (error.code === 'ECONNABORTED') {
      console.error('[Device API] Connection timeout - ESP32 기기 응답 없음');
    } else if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
      console.error('[Device API] Network error - ESP32 기기에 연결할 수 없음');
    } else {
      console.error('[Device API] Error:', error.response?.data || error.message);
    }
    
    return Promise.reject(error);
  }
);

/**
 * Device API Utility Functions
 * 
 * ESP32 기기와의 통신을 위한 유틸리티 함수들
 * 자주 사용되는 API 호출을 래핑하여 편의성 제공
 */
export const deviceUtils = {
  /**
   * 기기 상태 조회
   * @returns {Promise} 기기 상태 정보
   */
  async getStatus() {
    return deviceAPI.get('/api/status');
  },

  /**
   * 기기 정보 조회
   * @returns {Promise} 상세 기기 정보
   */
  async getDeviceInfo() {
    return deviceAPI.get('/api/device-info');
  },

  /**
   * WiFi 설정
   * @param {string} ssid - WiFi 네트워크 이름
   * @param {string} password - WiFi 비밀번호
   * @param {string} token - 인증 토큰
   * @returns {Promise} 설정 결과
   */
  async configureWiFi(ssid: string, password: string, token: string) {
    return deviceAPI.post('/api/wifi-config', {
      ssid,
      password,
      token
    });
  },

  /**
   * 기기 리셋
   * @returns {Promise} 리셋 결과
   */
  async resetDevice() {
    return deviceAPI.post('/api/reset');
  },

  /**
   * 기기 연결 상태 확인
   * @returns {Promise<boolean>} 연결 가능 여부
   */
  async isDeviceAvailable(): Promise<boolean> {
    try {
      await this.getStatus();
      return true;
    } catch {
      return false;
    }
  }
};

export default deviceAPI;