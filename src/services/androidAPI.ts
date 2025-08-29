import AndroidBridge from './AndroidBridge';

/**
 * Android API Client
 * 
 * 안드로이드 WebView에서 네이티브 기능을 사용하기 위한 브리지
 * WiFi 스캔/연결, 진동, HTTP 요청 등을 제공
 * 
 * 주요 기능:
 * - WiFi 관련: scanWiFi(), connectToWiFi(), connectToWiFiAsSecondary()
 * - 진동 관련: vibrateOnce(), vibratePattern(), stopVibration()
 * - HTTP 요청: get(), post(), put(), delete() (baseURL 설정 후)
 * - 복합 기능: scanWiFiAndSendToServer(), connectWiFiWithServerValidation()
 * 
 * 사용 예시:
 * - WiFi 스캔: const networks = await androidAPI.scanWiFi()
 * - WiFi 연결: await androidAPI.connectToWiFi('MyWiFi', 'password')
 * - 진동: await androidAPI.vibrateOnce(500, true)
 * - 패턴 진동: await androidAPI.vibratePattern([0, 200, 100, 200])
 * 
 * HTTP 기능 사용시:
 * - androidAPI.initHTTP('https://api.example.com')
 * - const response = await androidAPI.get('/data')
 */
export const androidAPI = new AndroidBridge();

/**
 * Android API Static Utilities
 * 
 * 안드로이드 환경 감지 및 기기 정보 확인을 위한 정적 메서드들
 * 
 * 사용 예시:
 * - if (AndroidAPI.isAndroidWebView()) { ... }
 * - const info = AndroidAPI.getDeviceInfo()
 * - const bridge = AndroidAPI.createBridge('https://api.example.com')
 */
export const AndroidAPI = {
  /**
   * 현재 환경이 안드로이드 WebView인지 확인
   * @returns {boolean} 안드로이드 WebView 여부
   */
  isAndroidWebView(): boolean {
    return typeof window !== 'undefined' && !!window.Android;
  },

  /**
   * 기기 정보 및 기능 지원 여부 확인
   * @returns {object} 기기 정보 객체
   */
  getDeviceInfo(): { isAndroid: boolean; hasWiFi: boolean; hasVibration: boolean } {
    const isAndroid = this.isAndroidWebView();
    return {
      isAndroid,
      hasWiFi: isAndroid,
      hasVibration: isAndroid
    };
  },

  /**
   * 새로운 AndroidBridge 인스턴스 생성
   * @param {string} baseURL - HTTP 요청용 기본 URL (선택사항)
   * @returns {AndroidBridge} 새로운 AndroidBridge 인스턴스
   */
  createBridge(baseURL?: string): AndroidBridge {
    return new AndroidBridge(baseURL);
  }
};

export default androidAPI;