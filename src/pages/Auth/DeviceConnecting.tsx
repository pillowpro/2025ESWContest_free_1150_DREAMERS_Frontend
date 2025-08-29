import styled, { keyframes } from "styled-components";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DeviceConnecting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/device-location");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <GradientHeader />
      <Section>
        <Title>베개프로 등록하기</Title>
        
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
        
        <StatusText>등록 중...</StatusText>
        <SubText>잠시만 기다려 주세요</SubText>
        
        <InfoText>
          서버 상황에 따라 최대 1분이 걸릴 수 있습니다
        </InfoText>
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