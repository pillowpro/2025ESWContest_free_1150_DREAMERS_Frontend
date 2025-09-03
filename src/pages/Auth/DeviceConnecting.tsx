import styled, { keyframes } from "styled-components";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { provisioningAPI } from "../../services";

interface UserWiFiCredentials {
  ssid: string;
  password: string;
}

const DeviceConnecting = () => {
  const navigate = useNavigate();
  const [statusText, setStatusText] = useState('기기에 연결 중...');
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('');
  const [pollingTimeout, setPollingTimeout] = useState<number | null>(null);

  // ESP32 설정은 WifiSetup에서 이미 완료되었으므로 제거

  const pollRegistrationStatus = () => {
    const provisioningCode = localStorage.getItem('PROVISIONING_CODE');
    if (!provisioningCode) return;

    let attempts = 0;
    const maxAttempts = 60; // 1분간 폴링 (1초마다)

    const poll = async () => {
      try {
        attempts++;
        setStatusText(`등록 상태 확인 중... (${attempts}/${maxAttempts})`);

        const response = await provisioningAPI.checkStatus(provisioningCode);

        if (response.success) {
          const status = response.data.status;
          
          if (status === 'completed') {
            setStatusText('등록 완료!');
            setIsComplete(true);
            
            // 기기 정보 저장
            if (response.data.device_id) {
              localStorage.setItem('CONNECTED_DEVICE_ID', response.data.device_id);
            }
            
            // 2초 후 기기 위치 설정 페이지로 이동
            setTimeout(() => {
              navigate("/device-location");
            }, 2000);
            return;
          }
          
          if (status === 'expired' || status === 'failed') {
            setError('등록이 만료되었거나 실패했습니다. 처음부터 다시 시도해주세요.');
            return;
          }
        }

        // 최대 시도 횟수 초과
        if (attempts >= maxAttempts) {
          setError('등록 시간이 초과되었습니다. 처음부터 다시 시도해주세요.');
          setTimeout(() => {
            navigate('/device-register');
          }, 3000);
          return;
        }

        // 1초 후 다시 시도
        const timeout = window.setTimeout(poll, 1000);
        setPollingTimeout(timeout);
        
      } catch (error: any) {
        console.error('Polling error:', error);
        if (attempts >= maxAttempts) {
          setError('서버 연결에 문제가 있습니다. 나중에 다시 시도해주세요.');
        } else {
          // 에러가 발생해도 계속 폴링
          const timeout = window.setTimeout(poll, 1000);
          setPollingTimeout(timeout);
        }
      }
    };

    poll();
  };

  useEffect(() => {
    // ESP32 설정은 WifiSetup에서 이미 완료되었으므로 바로 서버 폴링 시작
    setStatusText('서버 등록 대기 중...');
    pollRegistrationStatus();

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (pollingTimeout) {
        window.clearTimeout(pollingTimeout);
      }
    };
  }, [navigate]);

  return (
    <Container>
      <GradientHeader />
      <Section>
        <Title>베개프로 등록하기</Title>
        
        {!error ? (
          <>
            <LoadingContainer>
              {isComplete ? (
                <SuccessIcon>✅</SuccessIcon>
              ) : (
                <LoadingSpinner />
              )}
            </LoadingContainer>
            
            <StatusText>{statusText}</StatusText>
            <SubText>{isComplete ? '곧 다음 단계로 이동합니다' : '잠시만 기다려 주세요'}</SubText>
            
            {!isComplete && (
              <InfoText>
                서버 상황에 따라 최대 1분이 걸릴 수 있습니다
              </InfoText>
            )}
          </>
        ) : (
          <>
            <LoadingContainer>
              <ErrorIcon>❌</ErrorIcon>
            </LoadingContainer>
            
            <StatusText>등록 실패</StatusText>
            <ErrorMessage>{error}</ErrorMessage>
          </>
        )}
      </Section>
      
      <SubmitSection>
        <Button text="다음" disabled />
      </SubmitSection>
    </Container>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 60px 0 40px 0;
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const StatusText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 8px;
`;

const SubText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
`;

const InfoText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
`;

const SuccessIcon = styled.div`
  font-size: 48px;
  animation: bounce 0.6s ease-in-out;
  
  @keyframes bounce {
    0%, 20%, 60%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    80% {
      transform: translateY(-5px);
    }
  }
`;

const ErrorIcon = styled.div`
  font-size: 48px;
`;

const ErrorMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
  line-height: 1.4;
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

export default DeviceConnecting;