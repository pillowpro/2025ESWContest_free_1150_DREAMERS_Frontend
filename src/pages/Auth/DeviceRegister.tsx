import styled from "styled-components";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { provisioningAPI } from "../../services";
import imageUrl from "../../assets/image.png";

const DeviceRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNext = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await provisioningAPI.requestProvisioningCode({
        device_type: "pillow",
        location: "서울시 강남구" // 나중에 사용자 위치로 변경 가능
      });

      if (response.success) {
        // 프로비저닝 코드를 localStorage에 저장
        localStorage.setItem('PROVISIONING_CODE', response.data.provisioning_code);
        localStorage.setItem('PROVISIONING_EXPIRES_AT', response.data.expires_at);
        
        navigate("/device-searching");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || '프로비저닝 코드 요청에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Section>
        <Title>베개프로 등록하기</Title>

        <DeviceImageContainer>
          <DeviceImage
            src={imageUrl}
            alt="베개프로 초기화 화면"
          />
        </DeviceImageContainer>

        <Description>위 초기화 화면이 나와야 등록할 수 있습니다</Description>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Section>

      <SubmitSection>
        <Button 
          text={isLoading ? "프로비저닝 준비 중..." : "다음"} 
          onClick={handleNext} 
          disabled={isLoading}
        />
      </SubmitSection>
    </Container>
  );
};

const DeviceImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

const DeviceImage = styled.img`
  width: 100%;
  max-width: 320px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const Description = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  width: 100%;
  text-align: center;
  color: #ff4444;
  font-size: 14px;
  margin-top: 16px;
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
  margin-bottom: 20px;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 130px 28px;
  position: relative;
  z-index: 1;
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

export default DeviceRegister;
