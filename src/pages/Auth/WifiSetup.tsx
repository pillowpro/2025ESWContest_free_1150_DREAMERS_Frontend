import styled from "styled-components";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const WifiSetup = () => {
  const navigate = useNavigate();
  const [wifiData, setWifiData] = useState({
    ssid: '',
    password: ''
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setWifiData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleNext = () => {
    if (wifiData.ssid && wifiData.password) {
      navigate("/device-connecting");
    }
  };

  const isFormValid = wifiData.ssid.trim() !== '' && wifiData.password.trim() !== '';

  return (
    <Container>
      <GradientHeader />
      <Section>
        <Title>베개프로 등록하기</Title>
        
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
            베개프로는 2.4Ghz 대역의 와이파이에만 연결할 수 있으므로
            연결해 주 5Ghz
          </InfoText>
        </InfoBox>
      </Section>
      
      <SubmitSection>
        <Button 
          text="다음" 
          onClick={handleNext} 
          disabled={!isFormValid}
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