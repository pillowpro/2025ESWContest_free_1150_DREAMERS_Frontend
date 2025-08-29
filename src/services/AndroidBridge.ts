import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

interface WiFiNetwork {
  ssid: string;
  bssid: string;
  level: number;
  frequency: number;
  capabilities: string;
}

interface AndroidResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface WiFiScanResponse {
  networks?: WiFiNetwork[];
  error?: string;
}

declare global {
  interface Window {
    Android: {
      scanWiFi(): string;
      connectToWiFi(ssid: string, password: string): string;
      connectToWiFiAsSecondary(ssid: string, password: string): string;
      vibrateOnce(duration: number, fadeInOut: boolean): string;
      vibrate(pattern: string, fadeInOut: boolean): string;
      stopVibration(): string;
    };
  }
}

class AndroidBridge {
  private axiosInstance?: AxiosInstance;

  constructor(baseURL?: string) {
    if (baseURL) {
      this.axiosInstance = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  private ensureAxiosInstance(): void {
    if (!this.axiosInstance) {
      throw new Error('HTTP functionality not initialized. Provide baseURL in constructor or use initHTTP()');
    }
  }

  initHTTP(baseURL: string): void {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private parseAndroidResponse<T = AndroidResponse>(response: string): T {
    try {
      return JSON.parse(response) as T;
    } catch (error) {
      throw new Error(`Failed to parse Android response: ${response}`);
    }
  }

  private checkAndroidAvailability(): void {
    if (typeof window === 'undefined' || !window.Android) {
      throw new Error('Android JS Bridge is not available');
    }
  }

  // WiFi Methods
  async scanWiFi(): Promise<WiFiNetwork[]> {
    this.checkAndroidAvailability();
    
    try {
      const result = window.Android.scanWiFi();
      const parsed = this.parseAndroidResponse<WiFiNetwork[] | { error: string }>(result);
      
      if ('error' in parsed) {
        throw new Error(parsed.error);
      }
      
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      throw new Error(`WiFi scan failed: ${error}`);
    }
  }

  async connectToWiFi(ssid: string, password: string): Promise<AndroidResponse> {
    this.checkAndroidAvailability();
    
    if (!ssid.trim()) {
      throw new Error('SSID is required');
    }

    try {
      const result = window.Android.connectToWiFi(ssid, password);
      return this.parseAndroidResponse<AndroidResponse>(result);
    } catch (error) {
      throw new Error(`WiFi connection failed: ${error}`);
    }
  }

  async connectToWiFiAsSecondary(ssid: string, password: string): Promise<AndroidResponse> {
    this.checkAndroidAvailability();
    
    if (!ssid.trim()) {
      throw new Error('SSID is required');
    }

    try {
      const result = window.Android.connectToWiFiAsSecondary(ssid, password);
      return this.parseAndroidResponse<AndroidResponse>(result);
    } catch (error) {
      throw new Error(`Secondary WiFi connection failed: ${error}`);
    }
  }

  // Vibration Methods
  async vibrateOnce(duration: number, fadeInOut: boolean = false): Promise<AndroidResponse> {
    this.checkAndroidAvailability();
    
    if (duration <= 0) {
      throw new Error('Duration must be positive');
    }

    try {
      const result = window.Android.vibrateOnce(duration, fadeInOut);
      return this.parseAndroidResponse<AndroidResponse>(result);
    } catch (error) {
      throw new Error(`Vibration failed: ${error}`);
    }
  }

  async vibratePattern(pattern: number[], fadeInOut: boolean = false): Promise<AndroidResponse> {
    this.checkAndroidAvailability();
    
    if (!Array.isArray(pattern) || pattern.length === 0) {
      throw new Error('Pattern must be a non-empty array');
    }

    if (pattern.some(p => p < 0)) {
      throw new Error('Pattern values must be non-negative');
    }

    try {
      const patternString = pattern.join(',');
      const result = window.Android.vibrate(patternString, fadeInOut);
      return this.parseAndroidResponse<AndroidResponse>(result);
    } catch (error) {
      throw new Error(`Pattern vibration failed: ${error}`);
    }
  }

  async stopVibration(): Promise<AndroidResponse> {
    this.checkAndroidAvailability();
    
    try {
      const result = window.Android.stopVibration();
      return this.parseAndroidResponse<AndroidResponse>(result);
    } catch (error) {
      throw new Error(`Stop vibration failed: ${error}`);
    }
  }

  // HTTP Methods with Axios
  async get<T = any>(url: string, params?: Record<string, any>): Promise<AxiosResponse<T>> {
    this.ensureAxiosInstance();
    try {
      return await this.axiosInstance!.get<T>(url, { params });
    } catch (error) {
      throw new Error(`GET request failed: ${error}`);
    }
  }

  async post<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
    this.ensureAxiosInstance();
    try {
      return await this.axiosInstance!.post<T>(url, data);
    } catch (error) {
      throw new Error(`POST request failed: ${error}`);
    }
  }

  async put<T = any>(url: string, data?: any): Promise<AxiosResponse<T>> {
    this.ensureAxiosInstance();
    try {
      return await this.axiosInstance!.put<T>(url, data);
    } catch (error) {
      throw new Error(`PUT request failed: ${error}`);
    }
  }

  async delete<T = any>(url: string): Promise<AxiosResponse<T>> {
    this.ensureAxiosInstance();
    try {
      return await this.axiosInstance!.delete<T>(url);
    } catch (error) {
      throw new Error(`DELETE request failed: ${error}`);
    }
  }

  // Utility Methods
  setBaseURL(baseURL: string): void {
    if (!this.axiosInstance) {
      this.initHTTP(baseURL);
    } else {
      this.axiosInstance.defaults.baseURL = baseURL;
    }
  }

  setHeader(key: string, value: string): void {
    this.ensureAxiosInstance();
    this.axiosInstance!.defaults.headers.common[key] = value;
  }

  setTimeout(timeout: number): void {
    this.ensureAxiosInstance();
    this.axiosInstance!.defaults.timeout = timeout;
  }

  // Combined Methods - Android + HTTP
  async scanWiFiAndSendToServer(serverUrl: string): Promise<{
    networks: WiFiNetwork[];
    serverResponse: AxiosResponse;
  }> {
    try {
      const networks = await this.scanWiFi();
      const serverResponse = await this.post(serverUrl, { networks, timestamp: Date.now() });
      
      return { networks, serverResponse };
    } catch (error) {
      throw new Error(`Scan and send failed: ${error}`);
    }
  }

  async connectWiFiWithServerValidation(
    ssid: string, 
    password: string, 
    validationUrl: string
  ): Promise<{
    connectionResult: AndroidResponse;
    validationResponse?: AxiosResponse;
  }> {
    try {
      const connectionResult = await this.connectToWiFi(ssid, password);
      
      let validationResponse;
      if (connectionResult.success) {
        validationResponse = await this.post(validationUrl, {
          ssid,
          connected: true,
          timestamp: Date.now()
        });
      }

      return { connectionResult, validationResponse };
    } catch (error) {
      throw new Error(`Connect with validation failed: ${error}`);
    }
  }

  // Event Helpers
  onWiFiScanComplete(callback: (networks: WiFiNetwork[]) => void): void {
    this.scanWiFi()
      .then(callback)
      .catch(error => console.error('WiFi scan error:', error));
  }

  onVibrationComplete(callback: (result: AndroidResponse) => void, duration: number = 500): void {
    this.vibrateOnce(duration)
      .then(callback)
      .catch(error => console.error('Vibration error:', error));
  }
}

// Static Methods
export const AndroidAPI = {
  isAndroidWebView(): boolean {
    return typeof window !== 'undefined' && !!window.Android;
  },

  getDeviceInfo(): { isAndroid: boolean; hasWiFi: boolean; hasVibration: boolean } {
    const isAndroid = this.isAndroidWebView();
    return {
      isAndroid,
      hasWiFi: isAndroid,
      hasVibration: isAndroid
    };
  },

  createBridge(baseURL?: string): AndroidBridge {
    return new AndroidBridge(baseURL);
  }
};

export { AndroidBridge };
export type { WiFiNetwork, AndroidResponse, WiFiScanResponse };
export default AndroidBridge;