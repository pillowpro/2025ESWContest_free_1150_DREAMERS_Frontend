import styled from "styled-components";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Agreement = () => {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState({
    privacy: false,
    sensitive: false,
  });

  const handleNext = () => {
    if (agreements.privacy && agreements.sensitive) {
      navigate("/signup");
    }
  };

  const handleLink = () => {
    navigate("/login");
  };

  const toggleAgreement = (type: "privacy" | "sensitive") => {
    setAgreements((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <Container>
      <GradientHeader />
      <Section>
        <Title>가입하기</Title>

        <AgreementContainer onClick={() => toggleAgreement("privacy")}>
          <AgreementBox checked={agreements.privacy}>
            <CheckboxWrapper>
              <CustomCheckbox checked={agreements.privacy}>
                {agreements.privacy && (
                  <CheckIcon
                    src="https://skrr.zerotravel.kr/uploads/cb93edcf-c086-4647-a2f5-9c1d782f2cda-check.svg"
                    alt="체크"
                  />
                )}
              </CustomCheckbox>
            </CheckboxWrapper>
            <AgreementText>
              <BoldText>개인정보 처리방침</BoldText>에 동의합니다
            </AgreementText>
          </AgreementBox>
        </AgreementContainer>

        <AgreementContainer onClick={() => toggleAgreement("sensitive")}>
          <AgreementBox checked={agreements.sensitive}>
            <CheckboxWrapper>
              <CustomCheckbox checked={agreements.sensitive}>
                {agreements.sensitive && (
                  <CheckIcon
                    src="https://skrr.zerotravel.kr/uploads/cb93edcf-c086-4647-a2f5-9c1d782f2cda-check.svg"
                    alt="체크"
                  />
                )}
              </CustomCheckbox>
            </CheckboxWrapper>
            <AgreementText>
              <BoldText>민감정보 처리방침</BoldText>에 동의합니다
            </AgreementText>
          </AgreementBox>
        </AgreementContainer>
      </Section>

      <SubmitSection>
        <Button
          text="다음"
          onClick={handleNext}
          disabled={!agreements.privacy || !agreements.sensitive}
        />
        <div>
          이미 계정이 있으신가요? <span onClick={handleLink}>로그인</span>
        </div>
      </SubmitSection>
    </Container>
  );
};

const AgreementContainer = styled.div`
  width: 100%;
  cursor: pointer;
`;

const AgreementBox = styled.div<{ checked: boolean }>`
  width: 100%;
  background-color: white;
  border: 2px solid ${(props) => (props.checked ? "#3594ce" : "#e0e0e0")};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(props) => (props.checked ? "#2b7ab5" : "#bbb")};
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomCheckbox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid ${(props) => (props.checked ? "#3594ce" : "#d1d1d1")};
  border-radius: 4px;
  background-color: ${(props) => (props.checked ? "#3594ce" : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
`;

const CheckIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const AgreementText = styled.span`
  color: #333;
  font-size: 16px;
  line-height: 1.4;
  flex: 1;
`;

const BoldText = styled.span`
  font-weight: bold;
  color: #2170a8;
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
  span {
    color: #3594ce;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Title = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 40px;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 130px 28px;
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

export default Agreement;
