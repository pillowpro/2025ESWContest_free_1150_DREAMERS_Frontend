import type { WiFiNetwork } from './AndroidBridge';

/**
 * BaeGaePro 네트워크 필터링 유틸리티
 */

/**
 * BaeGaePro 네트워크 여부 확인
 * @param ssid - WiFi 네트워크 이름
 * @returns BaeGaePro 네트워크 여부
 */
export const isBaeGaeProNetwork = (ssid: string): boolean => {
  // BaeGaePro 네트워크는 "BaeGaePro_" 또는 "BaeGaePRO-" 로 시작
  return ssid.startsWith('BaeGaePro_') || ssid.startsWith('BaeGaePRO-');
};

/**
 * WiFi 네트워크 목록에서 BaeGaePro 네트워크만 필터링
 * @param networks - 전체 WiFi 네트워크 목록
 * @returns BaeGaePro 네트워크 목록
 */
export const filterBaeGaeProNetworks = (networks: WiFiNetwork[]): WiFiNetwork[] => {
  return networks.filter(network => isBaeGaeProNetwork(network.ssid));
};

/**
 * SSID에서 기기 ID 추출
 * BaeGaePro_XXXX 또는 BaeGaePRO-XXXX 형식에서 XXXX 부분 추출
 * @param ssid - WiFi 네트워크 이름
 * @returns 기기 ID
 */
export const extractDeviceIdFromSSID = (ssid: string): string => {
  if (!isBaeGaeProNetwork(ssid)) {
    return '';
  }
  
  // "BaeGaePro_" 또는 "BaeGaePRO-" 이후의 부분을 기기 ID로 사용
  if (ssid.startsWith('BaeGaePro_')) {
    return ssid.replace('BaeGaePro_', '');
  } else if (ssid.startsWith('BaeGaePRO-')) {
    return ssid.replace('BaeGaePRO-', '');
  }
  return '';
};

/**
 * 신호 강도를 텍스트로 변환
 * @param rssi - RSSI 값 (dBm)
 * @returns 신호 강도 텍스트
 */
export const getSignalStrengthText = (rssi: number): string => {
  if (rssi >= -50) return '매우 좋음';
  if (rssi >= -60) return '좋음';
  if (rssi >= -70) return '보통';
  if (rssi >= -80) return '약함';
  return '매우 약함';
};

/**
 * 신호 강도를 레벨(1-5)로 변환
 * @param rssi - RSSI 값 (dBm)
 * @returns 신호 강도 레벨 (1-5)
 */
export const getSignalLevel = (rssi: number): number => {
  if (rssi >= -50) return 5;
  if (rssi >= -60) return 4;
  if (rssi >= -70) return 3;
  if (rssi >= -80) return 2;
  return 1;
};

/**
 * WiFi 보안 타입 확인
 * @param capabilities - 네트워크 capabilities 문자열
 * @returns 보안 타입
 */
export const getSecurityType = (capabilities: string): string => {
  const caps = capabilities.toUpperCase();
  
  if (caps.includes('WPA3')) return 'WPA3';
  if (caps.includes('WPA2')) return 'WPA2';
  if (caps.includes('WPA')) return 'WPA';
  if (caps.includes('WEP')) return 'WEP';
  if (caps.includes('[OPEN]') || caps === '') return 'Open';
  
  return 'Unknown';
};

/**
 * 네트워크가 오픈 네트워크인지 확인
 * @param capabilities - 네트워크 capabilities 문자열
 * @returns 오픈 네트워크 여부
 */
export const isOpenNetwork = (capabilities: string): boolean => {
  return getSecurityType(capabilities) === 'Open';
};

/**
 * WiFi 네트워크 정렬 (신호 강도 기준)
 * @param networks - WiFi 네트워크 목록
 * @param ascending - 오름차순 여부 (기본: false, 내림차순)
 * @returns 정렬된 네트워크 목록
 */
export const sortNetworksBySignal = (
  networks: WiFiNetwork[], 
  ascending: boolean = false
): WiFiNetwork[] => {
  return [...networks].sort((a, b) => {
    return ascending ? a.rssi - b.rssi : b.rssi - a.rssi;
  });
};

/**
 * BaeGaePro 네트워크 포맷
 * @param network - WiFi 네트워크
 * @returns 포맷된 BaeGaePro 네트워크 정보
 */
export interface FormattedBaeGaeProNetwork {
  ssid: string;
  deviceId: string;
  signal: string;
  signalLevel: number;
  rssi: number;
  bssid: string;
  frequency: number;
  security: string;
  isOpen: boolean;
}

export const formatBaeGaeProNetwork = (network: WiFiNetwork): FormattedBaeGaeProNetwork => {
  return {
    ssid: network.ssid,
    deviceId: extractDeviceIdFromSSID(network.ssid),
    signal: getSignalStrengthText(network.rssi),
    signalLevel: getSignalLevel(network.rssi),
    rssi: network.rssi,
    bssid: network.bssid,
    frequency: network.frequency,
    security: getSecurityType(network.capabilities),
    isOpen: isOpenNetwork(network.capabilities)
  };
};

/**
 * BaeGaePro 네트워크 목록 포맷 및 정렬
 * @param networks - 전체 WiFi 네트워크 목록
 * @returns 포맷되고 정렬된 BaeGaePro 네트워크 목록
 */
export const getBaeGaeProNetworks = (networks: WiFiNetwork[]): FormattedBaeGaeProNetwork[] => {
  const baeGaeProNetworks = filterBaeGaeProNetworks(networks);
  const sortedNetworks = sortNetworksBySignal(baeGaeProNetworks);
  return sortedNetworks.map(formatBaeGaeProNetwork);
};

export default {
  isBaeGaeProNetwork,
  filterBaeGaeProNetworks,
  extractDeviceIdFromSSID,
  getSignalStrengthText,
  getSignalLevel,
  getSecurityType,
  isOpenNetwork,
  sortNetworksBySignal,
  formatBaeGaeProNetwork,
  getBaeGaeProNetworks
};