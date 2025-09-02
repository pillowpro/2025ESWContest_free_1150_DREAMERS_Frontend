import styled, { keyframes } from "styled-components";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AndroidBridge, filterBaeGaeProNetworks, extractDeviceIdFromSSID } from "../../services";

interface BaeGaeProNetwork {
  ssid: string;
  deviceId: string;
  signal: string;
  rssi: number;
}

const DeviceSearching = () => {
  const navigate = useNavigate();
  const [selectedWifi, setSelectedWifi] = useState<string>("");
  const [baeGaeProNetworks, setBaeGaeProNetworks] = useState<BaeGaeProNetwork[]>([]);
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState('');

  const scanForBaeGaeProNetworks = async () => {
    try {
      setIsScanning(true);
      setError('');

      const androidBridge = new AndroidBridge();
      const response = await androidBridge.scanWiFiNetworks();
      if (response.success) {
        const baeGaeProNetworks = filterBaeGaeProNetworks(response.data.networks);
        
        const formattedNetworks: BaeGaeProNetwork[] = baeGaeProNetworks.map(network => ({
          ssid: network.ssid,
          deviceId: extractDeviceIdFromSSID(network.ssid),
          signal: getSignalStrength(network.rssi),
          rssi: network.rssi
        }));

        setBaeGaeProNetworks(formattedNetworks);
      } else {
        setError('WiFi 스캔에 실패했습니다.');
      }
    } catch (error: any) {
      console.error('WiFi scan error:', error);
      setError('WiFi 스캔 중 오류가 발생했습니다.');
    } finally {
      setIsScanning(false);
    }
  };

  const getSignalStrength = (rssi: number): string => {
    if (rssi >= -50) return '매우 좋음';
    if (rssi >= -60) return '좋음';
    if (rssi >= -70) return '보통';
    return '약함';
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 WiFi 스캔 시작
    scanForBaeGaeProNetworks();

    // 15초 후 재스캔 (BaeGaePro 네트워크를 찾지 못한 경우)
    const rescanTimer = setTimeout(() => {
      if (baeGaeProNetworks.length === 0) {
        scanForBaeGaeProNetworks();
      }
    }, 15000);

    return () => {
      clearTimeout(rescanTimer);
    };
  }, []);

  const handleWifiSelect = (network: BaeGaeProNetwork) => {
    setSelectedWifi(network.ssid);
    // 선택된 네트워크 정보를 localStorage에 저장
    localStorage.setItem('SELECTED_DEVICE_NETWORK', JSON.stringify(network));
  };

  const handleNext = () => {
    if (selectedWifi) {
      navigate("/wifi-setup");
    }
  };

  const handleRescan = () => {
    scanForBaeGaeProNetworks();
  };

  return (
    <Container>
      <GradientHeader />
      <Section>
        <Title>베개프로 등록하기</Title>

        {isScanning ? (
          <>
            <SearchContainer>
              <SearchAnimation>
                <OuterRing />
                <MiddleRing />
                <InnerCircle />
              </SearchAnimation>
            </SearchContainer>

            <Description>주변의 베개프로 기기를 찾고 있습니다</Description>
          </>
        ) : (
          <>
            {baeGaeProNetworks.length > 0 ? (
              <>
                <Description>발견된 베개프로 기기를 선택하세요</Description>
                <WifiListContainer>
                  {baeGaeProNetworks.map((network, index) => (
                    <WifiItem
                      key={index}
                      selected={selectedWifi === network.ssid}
                      onClick={() => handleWifiSelect(network)}
                    >
                      <WifiInfo>
                        <WifiName>베개프로 {network.deviceId}</WifiName>
                        <WifiSignal>신호 강도: {network.signal}</WifiSignal>
                      </WifiInfo>
                      <img src="https://skrr.zerotravel.kr/uploads/97957be0-5859-4fbd-8b28-e34205004c42-wifi_icon.svg" />
                    </WifiItem>
                  ))}
                </WifiListContainer>
              </>
            ) : (
              <>
                <SearchContainer>
                  <NoDeviceIcon>❌</NoDeviceIcon>
                </SearchContainer>
                <Description>주변에 베개프로 기기를 찾을 수 없습니다</Description>
                <RescanButton onClick={handleRescan}>다시 검색</RescanButton>
              </>
            )}
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </>
        )}
      </Section>

      {baeGaeProNetworks.length > 0 && !isScanning && (
        <SubmitSection>
          <Button text="다음" onClick={handleNext} disabled={!selectedWifi} />
        </SubmitSection>
      )}
    </Container>
  );
};

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const WifiListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 80px;
`;

const WifiItem = styled.div<{ selected: boolean }>`
  width: 100%;
  background-color: ${(props) => (props.selected ? "#f0f8ff" : "white")};
  border: 2px solid ${(props) => (props.selected ? "#3594ce" : "#e0e0e0")};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => (props.selected ? "#2b7ab5" : "#bbb")};
  }
`;

const WifiInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const WifiName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const WifiSignal = styled.div`
  font-size: 14px;
  color: #666;
`;

const NoDeviceIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const RescanButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
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

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 40px 0 20px 0;
`;

const SearchAnimation = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OuterRing = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const MiddleRing = styled.div`
  position: absolute;
  width: 84px;
  height: 84px;
  border: 3px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite 0.5s;
`;

const InnerCircle = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite 1s;
`;

const Description = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: white;
  line-height: 1.5;
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
  align-items: center;
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

export default DeviceSearching;
