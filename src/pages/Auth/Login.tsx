import styled from "styled-components";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleLink = () => {
    navigate("/agreement");
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '';

  return (
    <Container>
      <GradientHeader />
      <Section>
        <Title>시작하기</Title>
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
      </Section>
      <SubmitSection>
        <Button text="로그인" disabled={!isFormValid} />
        <div>
          아직 계정이 없으신가요? <span onClick={handleLink}>회원가입</span>
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

export default Login;
