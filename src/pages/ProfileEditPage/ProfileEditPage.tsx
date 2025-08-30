import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("이동현");

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = () => {
    // TODO: API 호출로 이름 저장
    alert("이름이 저장되었습니다.");
    navigate(-1);
  };

  return (
    <Container>
      <GradientHeader />

      <Header>
        <BackButton onClick={handleBack}>
          <BackIcon />
        </BackButton>
        <HeaderTitle>내 정보 수정</HeaderTitle>
      </Header>

      <ContentContainer>
        <FormSection>
          <SectionTitle>기본 정보</SectionTitle>

          <InputGroup>
            <Input
              text="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </InputGroup>
        </FormSection>

        <ButtonContainer>
          <Button
            text="저장하기"
            onClick={handleSave}
            disabled={!name.trim()}
          />
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 412px;
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  overflow-x: hidden;
  margin: 0 auto;
`;

const GradientHeader = styled.div`
  width: 100%;
  max-width: 412px;
  height: 360px;
  background: linear-gradient(180deg, #56a8da 0%, #3694ce 100%);
  border-radius: 0px 0px 80px 80px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 60px 24px 24px;
  position: relative;
  z-index: 1;
`;

const BackButton = styled.button`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 24px;
`;

const BackIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: white;
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 12H5' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12 19L5 12L12 5' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
    no-repeat center;
  mask-size: 24px 24px;
`;

const HeaderTitle = styled.h1`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  margin: 0;
  text-align: center;
`;

const ContentContainer = styled.div`
  border-radius: 30px;
  margin: 0 24px;
  padding: 24px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: calc(100vh - 200px);
`;

const FormSection = styled.div`
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: white;
  margin: 0;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  padding-bottom: 100px;
`;

export default ProfileEditPage;
