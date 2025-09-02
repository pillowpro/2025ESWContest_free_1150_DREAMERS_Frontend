import styled from "styled-components";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { provisioningAPI } from "../../services";

const DeviceLocation = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    "강원특별자치도",
    "충청북도",
    "충청남도",
    "전북특별자치도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
  ];

  useEffect(() => {
    // localStorage에서 연결된 기기 ID 가져오기
    const deviceId = localStorage.getItem('CONNECTED_DEVICE_ID');
    if (!deviceId) {
      // 기기 ID가 없으면 처음부터 다시 시작
      navigate('/device-register');
      return;
    }
    
    // 기본 기기 이름 설정
    setDeviceName(`침실 베개프로`);
  }, [navigate]);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsDropdownOpen(false);
    if (error) setError('');
  };

  const handleDeviceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceName(e.target.value);
    if (error) setError('');
  };

  const handleNext = async () => {
    if (!selectedLocation || !deviceName.trim() || isLoading) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const deviceId = localStorage.getItem('CONNECTED_DEVICE_ID');
      if (!deviceId) {
        setError('기기 정보를 찾을 수 없습니다.');
        return;
      }

      const response = await provisioningAPI.completeSetup({
        device_id: deviceId,
        device_name: deviceName.trim(),
        location_city: selectedLocation,
        timezone: 'Asia/Seoul'
      });

      if (response.success) {
        // 설정 완료 후 저장된 임시 데이터 정리
        localStorage.removeItem('PROVISIONING_CODE');
        localStorage.removeItem('PROVISIONING_EXPIRES_AT');
        localStorage.removeItem('SELECTED_DEVICE_NETWORK');
        localStorage.removeItem('USER_WIFI_CREDENTIALS');
        localStorage.removeItem('CONNECTED_DEVICE_ID');
        
        // 홈으로 이동
        navigate('/');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || '기기 설정 완료에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = selectedLocation !== "" && deviceName.trim() !== "";

  return (
    <Container>
      <GradientHeader />
      <Section>
        <Title>베개프로 등록하기</Title>

        <QuestionText>기기 정보를 입력해주세요</QuestionText>

        <InputContainer>
          <InputSection>
            <InputLabel>기기 이름</InputLabel>
            <DeviceNameInput
              type="text"
              placeholder="예: 침실 베개프로"
              value={deviceName}
              onChange={handleDeviceNameChange}
            />
          </InputSection>

          <InputSection>
            <InputLabel>위치</InputLabel>
            <DropdownContainer>
              <DropdownButton
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                hasValue={selectedLocation !== ""}
              >
                {selectedLocation || "지역을 선택해주세요"}
                <DropdownArrow isOpen={isDropdownOpen}>▼</DropdownArrow>
              </DropdownButton>

              {isDropdownOpen && (
                <DropdownList>
                  {locationOptions.map((option, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => handleLocationSelect(option)}
                      selected={selectedLocation === option}
                    >
                      {option}
                    </DropdownItem>
                  ))}
                </DropdownList>
              )}
            </DropdownContainer>
          </InputSection>
        </InputContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Section>

      <SubmitSection>
        <Button 
          text={isLoading ? "설정 완료 중..." : "완료"} 
          onClick={handleNext} 
          disabled={!isFormValid || isLoading} 
        />
      </SubmitSection>
    </Container>
  );
};

const InputContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
`;

const DeviceNameInput = styled.input`
  width: 100%;
  height: 50px;
  background-color: white;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  padding: 0 16px;
  font-size: 16px;
  color: #333;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: none;
    border-color: #3594ce;
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

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button<{ hasValue: boolean }>`
  width: 100%;
  height: 50px;
  background-color: white;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: ${(props) => (props.hasValue ? "#333" : "#999")};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #3594ce;
  }
`;

const DropdownArrow = styled.span<{ isOpen: boolean }>`
  font-size: 12px;
  color: #666;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #d1d1d1;
  border-top: none;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 300px;
  overflow-y: auto;
`;

const DropdownItem = styled.div<{ selected?: boolean }>`
  padding: 12px 16px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.selected ? "#f0f8ff" : "transparent")};

  &:hover {
    background-color: #f5f5f5;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const QuestionText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: white;
  line-height: 1.4;
  margin-top: 80px;
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

export default DeviceLocation;
