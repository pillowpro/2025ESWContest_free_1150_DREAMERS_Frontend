import { privateAPI } from './privateAPI';

/**
 * Device Provisioning API Types
 */
export interface ProvisioningRequest {
  device_type: string;
  location: string;
}

export interface ProvisioningResponse {
  success: true;
  message: string;
  data: {
    provisioning_code: string;
    expires_at: string;
    expires_in: number;
  };
}


export interface ProvisioningStatusResponse {
  success: true;
  data: {
    status: 'completed';
    device_id: string;
  };
}

export interface DeviceLocationRequest {
  device_id: string;
  latitude: number;
  longitude: number;
}

export interface DeviceLocationResponse {
  success: true;
  message: string;
}

export interface DeviceProvisionData {
  provisioning_token: string;
  wifi_ssid: string;
  wifi_password: string;
  server_url: string;
}

/**
 * Device Provisioning API Service
 */
export const provisioningAPI = {
  /**
   * 프로비저닝 코드 요청
   */
  requestProvisioningCode: async (data: ProvisioningRequest): Promise<ProvisioningResponse> => {
    const response = await privateAPI.post('/api/v1/devices/provisioning/request', data);
    return response.data;
  },

  /**
   * 프로비저닝 상태 확인
   */
  checkStatus: async (provisioning_code: string): Promise<ProvisioningStatusResponse> => {
    const response = await privateAPI.get(`/api/v1/devices/provisioning/status/${provisioning_code}`);
    return response.data;
  },

  /**
   * 기기 위치 설정
   */
  setLocation: async (data: DeviceLocationRequest): Promise<DeviceLocationResponse> => {
    const response = await privateAPI.post('/api/v1/devices/location', data);
    return response.data;
  },


};

/**
 * WiFi 비밀번호 생성 유틸리티
 */
export const generateWiFiPassword = (deviceId: string): string => {
  return `${deviceId}PSWR`;
};

// WiFi utility functions moved to wifiUtils.ts
// Import from there if needed

export default provisioningAPI;