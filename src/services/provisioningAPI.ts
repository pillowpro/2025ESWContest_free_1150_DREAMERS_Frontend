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

export interface ProvisioningStatusRequest {
  provisioning_code: string;
}

export interface ProvisioningStatusResponse {
  success: true;
  data: {
    status: 'pending' | 'connected' | 'completed' | 'expired' | 'failed';
    device_id?: string;
    message: string;
    requires_setup?: boolean;
  };
}

export interface DeviceCompleteRequest {
  device_id: string;
  device_name: string;
  location_city: string;
  timezone: string;
}

export interface DeviceCompleteResponse {
  success: true;
  message: string;
  data: {
    device_id: string;
    device_name: string;
    status: string;
    is_completed: boolean;
  };
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
    const response = await privateAPI.post('/api/v1/provisioning/request', data);
    return response.data;
  },

  /**
   * 등록 상태 확인 (폴링용)
   */
  checkStatus: async (data: ProvisioningStatusRequest): Promise<ProvisioningStatusResponse> => {
    const response = await privateAPI.post('/api/v1/provisioning/status', data);
    return response.data;
  },

  /**
   * 기기 설정 완료
   */
  completeSetup: async (data: DeviceCompleteRequest): Promise<DeviceCompleteResponse> => {
    const response = await privateAPI.post('/api/v1/provisioning/complete', data);
    return response.data;
  },

  /**
   * 기기로 프로비저닝 데이터 전송 (로컬 192.168.4.1)
   */
  sendProvisioningDataToDevice: async (data: DeviceProvisionData): Promise<any> => {
    try {
      const response = await fetch('http://192.168.4.1/provision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(10000), // 10초 타임아웃
      });
      
      if (!response.ok) {
        throw new Error(`Device communication failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to send provisioning data to device:', error);
      throw error;
    }
  },
};

/**
 * WiFi 비밀번호 생성 유틸리티
 */
export const generateWiFiPassword = (deviceId: string): string => {
  return `${deviceId}PSWR`;
};

/**
 * BaeGaePro WiFi 필터링 유틸리티
 */
export const filterBaeGaeProNetworks = (networks: any[]): any[] => {
  return networks.filter(network => 
    network.ssid && network.ssid.startsWith('BaeGaePRO-')
  );
};

/**
 * Device ID 추출 유틸리티 (SSID에서)
 */
export const extractDeviceIdFromSSID = (ssid: string): string => {
  return ssid.replace('BaeGaePRO-', '');
};

export default provisioningAPI;