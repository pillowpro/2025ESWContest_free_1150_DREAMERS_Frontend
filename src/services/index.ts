/**
 * API Services - Clean Architecture
 * 
 * 모든 API 클라이언트와 유틸리티를 중앙에서 관리
 */

// Re-export all API clients
export * from './publicAPI';
export * from './privateAPI';
export * from './androidAPI';
export * from './deviceAPI';
export * from './authAPI';
export * from './provisioningAPI';

// Re-export AndroidBridge and types
export { AndroidBridge } from './AndroidBridge';
export type { WiFiNetwork, AndroidResponse, WiFiScanResponse } from './AndroidBridge';

// Re-export WiFi utilities
export * from './wifiUtils';

/**
 * API 유틸리티 함수들
 */
export const apiUtils = {
  setAccessToken: (token: string) => localStorage.setItem('ACCESS', token),
  removeAccessToken: () => localStorage.removeItem('ACCESS'),
  getAccessToken: (): string | null => localStorage.getItem('ACCESS'),
  isLoggedIn: (): boolean => !!localStorage.getItem('ACCESS'),
  logout: () => {
    localStorage.removeItem('ACCESS');
    window.location.href = '/login';
  }
};

// Import for unified API object
import publicAPI from './publicAPI';
import privateAPI from './privateAPI';
import androidAPI from './androidAPI';
import deviceAPI, { deviceUtils } from './deviceAPI';
import authAPI from './authAPI';
import provisioningAPI from './provisioningAPI';

/**
 * 통합 API 객체
 */
export const API = {
  public: publicAPI,
  private: privateAPI,
  android: androidAPI,
  device: deviceAPI,
  auth: authAPI,
  provisioning: provisioningAPI,
  utils: apiUtils,
  deviceUtils
};

export default API;