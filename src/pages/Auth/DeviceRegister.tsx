import styled from "styled-components";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const DeviceRegister = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/device-searching");
  };

  return (
    <Container>
      <Section>
        <Title>베개프로 등록하기</Title>

        <DeviceImageContainer>
          <DeviceImage
            src="https://skrr.zerotravel.kr/uploads/516295c2-d82c-4699-ae49-a4ce0e95e728-INIT 1.png"
            alt="베개프로 초기화 화면"
          />
        </DeviceImageContainer>

        <Description>위 초기화 화면이 나와야 등록할 수 있습니다</Description>
      </Section>

      <SubmitSection>
        <Button text="다음" onClick={handleNext} />
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
