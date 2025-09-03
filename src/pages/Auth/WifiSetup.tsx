import styled from "styled-components";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AndroidBridge, AndroidAPI, generateWiFiPassword } from "../../services";

// AndroidBridge 인스턴스 생성
const androidBridge = new AndroidBridge();

interface SelectedNetwork {
  ssid: string;
  deviceId: string;
  signal: string;
  rssi: number;
}

const WifiSetup = () => {
  const navigate = useNavigate();
  const [wifiData, setWifiData] = useState({
    ssid: '',
    password: ''
  });
  const [selectedNetwork, setSelectedNetwork] = useState<SelectedNetwork | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [isBaeGaeProConnected, setIsBaeGaeProConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('베개프로 기기에 연결 중...');

  useEffect(() => {
    const initializeWiFiSetup = async () => {
      // localStorage에서 선택된 네트워크 정보 가져오기
      androidBridge.logToConsole('info', '[WifiSetup] Loading selected network from localStorage...', 'WifiSetup');
      const networkData = localStorage.getItem('SELECTED_DEVICE_NETWORK');
      androidBridge.logToConsole('info', `[WifiSetup] Network data: ${networkData}`, 'WifiSetup');
      
      if (networkData) {
        try {
          const network: SelectedNetwork = JSON.parse(networkData);
          androidBridge.logToConsole('info', `[WifiSetup] Parsed network: ${JSON.stringify(network)}`, 'WifiSetup');
          setSelectedNetwork(network);
          
          // 베개프로 WiFi에 자동 연결
          await connectToSelectedBaeGaeProWiFi(network);
          
        } catch (error) {
          androidBridge.logToConsole('error', `[WifiSetup] Failed to parse network data: ${error}`, 'WifiSetup');
          navigate('/device-searching');
        }
      } else {
        androidBridge.logToConsole('warn', '[WifiSetup] No selected network found, redirecting', 'WifiSetup');
        navigate('/device-searching');
      }
    };

    initializeWiFiSetup();
  }, [navigate]);

  const connectToSelectedBaeGaeProWiFi = async (network: SelectedNetwork): Promise<void> => {
    try {
      setConnectionStatus('베개프로 기기에 연결 중...');
      androidBridge.logToConsole('info', `[WifiSetup] Connecting to BaeGaePRO WiFi: ${network.ssid}`, 'WifiSetup');
      
      const devicePassword = generateWiFiPassword(network.deviceId);
      androidBridge.logToConsole('info', `[WifiSetup] Generated device password for ${network.deviceId}`, 'WifiSetup');
      
      const response = await androidBridge.connectToWiFi({
        ssid: network.ssid,
        password: devicePassword,
        isHidden: false
      });

      if (response.success) {
        androidBridge.logToConsole('info', `[WifiSetup] Successfully connected to BaeGaePRO WiFi: ${network.ssid}`, 'WifiSetup');
        setIsBaeGaeProConnected(true);
        setConnectionStatus('베개프로 기기에 연결됨 ✅');
      } else {
        androidBridge.logToConsole('error', `[WifiSetup] Failed to connect to BaeGaePRO WiFi: ${response.message || 'Unknown error'}`, 'WifiSetup');
        setConnectionStatus('베개프로 기기 연결 실패 ❌');
        setError('베개프로 기기에 연결할 수 없습니다. 기기가 켜져있는지 확인해주세요.');
      }
    } catch (error) {
      androidBridge.logToConsole('error', `[WifiSetup] BaeGaePRO WiFi connection error: ${error}`, 'WifiSetup');
      setConnectionStatus('베개프로 기기 연결 오류 ❌');
      setError('베개프로 기기 연결 중 오류가 발생했습니다.');
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    androidBridge.logToConsole('info', `[WifiSetup] Input change - ${field}: ${value}`, 'WifiSetup');
    setWifiData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };
      androidBridge.logToConsole('info', `[WifiSetup] New wifiData: ${JSON.stringify(newData)}`, 'WifiSetup');
      return newData;
    });
    if (error) setError('');
  };

  const configureESP32WiFi = async (): Promise<boolean> => {
    const provisioningCode = localStorage.getItem('PROVISIONING_CODE');
    
    if (!provisioningCode) {
      androidBridge.logToConsole('error', '[WifiSetup] No provisioning code found', 'WifiSetup');
      return false;
    }

    try {
      androidBridge.logToConsole('info', `[WifiSetup] Configuring ESP32 WiFi - SSID: ${wifiData.ssid}`, 'WifiSetup');
      
      const response = await AndroidAPI.configureESP32WiFi(
        wifiData.ssid,
        wifiData.password,
        provisioningCode
      );

      androidBridge.logToConsole('info', `[WifiSetup] ESP32 configuration result: ${JSON.stringify(response)}`, 'WifiSetup');
      return response.success;
    } catch (error) {
      androidBridge.logToConsole('error', `[WifiSetup] ESP32 configuration failed: ${error}`, 'WifiSetup');
      return false;
    }
  };

  const handleNext = async () => {
    console.log('handleNext called', {
      ssid: wifiData.ssid,
      password: wifiData.password ? '***' : '',
      selectedNetwork,
      isConnecting,
      isFormValid
    });

    if (!wifiData.ssid || !wifiData.password || isConnecting) {
      androidBridge.logToConsole('warn', `[WifiSetup] Form validation failed - ssid: ${!!wifiData.ssid}, password: ${!!wifiData.password}, isConnecting: ${isConnecting}`, 'WifiSetup');
      return;
    }

    if (!isBaeGaeProConnected) {
      androidBridge.logToConsole('warn', '[WifiSetup] Cannot configure - not connected to BaeGaePRO WiFi', 'WifiSetup');
      setError('먼저 베개프로 기기에 연결해야 합니다. 페이지를 새로고침해주세요.');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      // ESP32에 WiFi 설정 전송 (SSID, 비밀번호, 프로비저닝 코드)
      const configurationSuccess = await configureESP32WiFi();
      
      if (!configurationSuccess) {
        setError('베개프로 기기 설정에 실패했습니다. 기기가 켜져있고 연결되어 있는지 확인해주세요.');
        return;
      }

      // WiFi 정보를 localStorage에 저장하고 다음 페이지로
      localStorage.setItem('USER_WIFI_CREDENTIALS', JSON.stringify({
        ssid: wifiData.ssid,
        password: wifiData.password
      }));

      androidBridge.logToConsole('info', '[WifiSetup] WiFi configuration successful, navigating to device-connecting', 'WifiSetup');
      navigate("/device-connecting");
      
    } catch (error: any) {
      androidBridge.logToConsole('error', `[WifiSetup] handleNext error: ${error}`, 'WifiSetup');
      setError('연결 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsConnecting(false);
    }
  };

  const isFormValid = wifiData.ssid.trim() !== '' && wifiData.password.trim() !== '';
  
  // 디버깅을 위한 실시간 로그
  androidBridge.logToConsole('info', `[WifiSetup] Current state - ssid: ${wifiData.ssid}, password: ${wifiData.password ? 'HAS_PASSWORD' : 'NO_PASSWORD'}, isConnecting: ${isConnecting}, isFormValid: ${isFormValid}`, 'WifiSetup');

  return (
    <Container>
      <GradientHeader />
      <Section>
        <Title>베개프로 등록하기</Title>
        
        {selectedNetwork && (
          <DeviceInfo>
            선택된 기기: 베개프로 {selectedNetwork.deviceId}
            <br />
            <DeviceNetwork>기기 네트워크: {selectedNetwork.ssid}</DeviceNetwork>
          </DeviceInfo>
        )}

        <ConnectionStatus connected={isBaeGaeProConnected}>
          {connectionStatus}
        </ConnectionStatus>
        
        <Description>
          이 베개프로가 사용할 와이파이의 정보를 알려주세요
        </Description>

        <InputContainer>
          <Input
            text="SSID"
            type="text"
            placeholder="SSID"
            value={wifiData.ssid}
            onChange={handleInputChange('ssid')}
          />
          <Input
            text="비밀번호"
            type="password"
            placeholder="PASSWORD"
            value={wifiData.password}
            onChange={handleInputChange('password')}
          />
        </InputContainer>

        <InfoBox>
          <InfoTitle>베개프로 와이파이 연결 안내</InfoTitle>
          <InfoText>
            베개프로는 2.4GHz 대역의 와이파이에만 연결할 수 있습니다.
            5GHz 전용 네트워크는 사용할 수 없습니다.
          </InfoText>
        </InfoBox>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Section>
      
      <SubmitSection>
        <Button 
          text={isConnecting ? "연결 중..." : "다음"} 
          onClick={() => {
            androidBridge.logToConsole('info', '[WifiSetup] Button clicked!', 'WifiSetup');
            androidBridge.logToConsole('info', `[WifiSetup] Button state - isFormValid: ${isFormValid}, isConnecting: ${isConnecting}, disabled: ${!isFormValid || isConnecting}, ssid: ${wifiData.ssid}, hasPassword: ${!!wifiData.password}, hasSelectedNetwork: ${!!selectedNetwork}`, 'WifiSetup');
            handleNext();
          }} 
          disabled={!isFormValid || isConnecting}
        />
      </SubmitSection>
    </Container>
  );
};

const InfoBox = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 16px;
  margin-top: 24px;
`;

const InfoTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const InfoText = styled.div`
  font-size: 13px;
  color: #666;
  line-height: 1.4;
`;

const DeviceInfo = styled.div`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
`;

const DeviceNetwork = styled.span`
  font-size: 12px;
  opacity: 0.8;
  font-weight: 400;
`;

const ConnectionStatus = styled.div<{ connected: boolean }>`
  background: ${(props) => (props.connected ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 193, 7, 0.2)')};
  color: ${(props) => (props.connected ? '#4CAF50' : '#FF9800')};
  border: 1px solid ${(props) => (props.connected ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 193, 7, 0.3)')};
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.2);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
`;

const Description = styled.div`
  width: 100%;
  text-align: left;
  font-size: 16px;
  color: white;
  line-height: 1.5;
  margin-top: 40px;
`;

const SubmitSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: absolute;
  bottom: 76px;
  padding-left: 28px;
  padding-right: 28px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 130px 28px 120px 28px;
  position: relative;
  z-index: 1;
`;

const GradientHeader = styled.div`
  width: 100%;
  max-width: 412px;
  height: 416px;
  background: linear-gradient(180deg, #56a8da 0%, #3694ce 100%);
  border-radius: 0 0 80px 80px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Container = styled.div`
  width: 100vw;
  max-width: 412px;
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 20px;
  margin: 0 auto;
`;

export default WifiSetup;