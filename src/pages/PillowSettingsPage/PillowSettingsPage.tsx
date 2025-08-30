import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

const PillowSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [pillowName, setPillowName] = useState("내 베개");
  const [pillowLocation, setPillowLocation] = useState("서울특별시");

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = () => {
    // TODO: API 호출로 베개 설정 저장
    alert("베개 설정이 저장되었습니다.");
    navigate(-1);
  };

  const locationOptions = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
  ];

  return (
    <Container>
      <GradientHeader />

      <Header>
        <BackButton onClick={handleBack}>
          <BackIcon />
        </BackButton>
        <HeaderTitle>내 베개 설정</HeaderTitle>
      </Header>

      <ContentContainer>
        <FormSection>
          <SectionTitle>베개 정보</SectionTitle>

          <InputGroup>
            <Input
              text="베개 이름"
              value={pillowName}
              onChange={(e) => setPillowName(e.target.value)}
              placeholder="베개 이름을 입력하세요"
            />
          </InputGroup>

          <InputGroup>
            <Label>베개 위치</Label>
            <Select
              value={pillowLocation}
              onChange={(e) => setPillowLocation(e.target.value)}
            >
              {locationOptions.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </InputGroup>
        </FormSection>

        <InfoSection>
          <InfoTitle>베개 상태</InfoTitle>
          <StatusGrid>
            <StatusItem>
              <StatusLabel>연결 상태</StatusLabel>
              <StatusValue $status="connected">연결됨</StatusValue>
            </StatusItem>
            <StatusItem>
              <StatusLabel>배터리</StatusLabel>
              <StatusValue>85%</StatusValue>
            </StatusItem>
            <StatusItem>
              <StatusLabel>펌웨어</StatusLabel>
              <StatusValue>v1.2.3</StatusValue>
            </StatusItem>
            <StatusItem>
              <StatusLabel>마지막 동기화</StatusLabel>
              <StatusValue>방금 전</StatusValue>
            </StatusItem>
          </StatusGrid>
        </InfoSection>

        <ButtonContainer>
          <Button
            text="설정 저장"
            onClick={handleSave}
            disabled={!pillowName.trim()}
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
  height: 420px;
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
  background: #ffffff;
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
  gap: 24px;
  min-height: calc(100vh - 200px);
`;

const FormSection = styled.div`
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoSection = styled.div`
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

const InfoTitle = styled.h2`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #333333;
  margin: 0;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 18px;
  font-weight: normal;
  color: white;
`;

const Select = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  background-color: white;
  color: #333333;

  &:focus {
    outline: none;
    border-color: #3694ce;
  }
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatusLabel = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #666666;
`;

const StatusValue = styled.span<{ $status?: string }>`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: ${({ $status }) => ($status === "connected" ? "#4CAF50" : "#333333")};
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  padding-bottom: 100px;
`;

export default PillowSettingsPage;
