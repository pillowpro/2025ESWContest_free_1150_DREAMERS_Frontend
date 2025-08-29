import styled from "styled-components";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleSignup = () => {
    if (isFormValid) {
      navigate("/device-register");
    }
  };

  const handleLink = () => {
    navigate("/login");
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const isFormValid = 
    formData.name.trim() !== '' && 
    formData.email.trim() !== '' && 
    formData.password.trim() !== '' && 
    formData.confirmPassword.trim() !== '' &&
    formData.password === formData.confirmPassword;

  return (
    <Container>
      <GradientHeader />
      <Section>
        <Title>가입하기</Title>
        <Input 
          text="이름" 
          type="text" 
          placeholder="이름을 입력하세요" 
          value={formData.name}
          onChange={handleInputChange('name')}
        />
        <Input 
          text="아이디" 
          type="text" 
          placeholder="이메일을 입력하세요" 
          value={formData.email}
          onChange={handleInputChange('email')}
        />
        <Input
          text="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={handleInputChange('password')}
        />
        <Input
          text="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
        />
      </Section>
      <SubmitSection>
        <Button text="가입하기" onClick={handleSignup} disabled={!isFormValid} />
        <div>
          이미 계정이 있으신가요? <span onClick={handleLink}>로그인</span>
        </div>
      </SubmitSection>
    </Container>
  );
};

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
  height: 584px;
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

export default Signup;
