import React, { useState } from "react";
import styled from "styled-components";

interface Prop {
  text: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ text, type, placeholder, value, onChange }: Prop) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }
    return type;
  };

  const getEyeIcon = () => {
    return showPassword
      ? "https://skrr.zerotravel.kr/uploads/e35a618f-3830-454d-bdf6-74481d88ff6e-eye_open.svg"
      : "https://skrr.zerotravel.kr/uploads/87fa9e3d-12c0-4e04-864d-d2c370d530b0-eye_closed.svg";
  };

  return (
    <Container>
      <Title>{text}</Title>
      <Section>
        <input 
          type={getInputType()} 
          placeholder={placeholder} 
          value={value || ''}
          onChange={onChange}
        />
        {type === "password" && (
          <EyeIcon 
            src={getEyeIcon()} 
            onClick={togglePasswordVisibility}
            alt="비밀번호 표시/숨김"
          />
        )}
      </Section>
    </Container>
  );
};

const Section = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid #d1d1d1;
  background-color: white;
  border-radius: 5px;
  padding-left: 12px;
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    height: 100%;
    border: none;
    font-size: 16px;
    padding-right: ${({ children }) => children ? '40px' : '12px'};
    
    &:focus {
      outline: none;
    }
  }
`;

const EyeIcon = styled.img`
  position: absolute;
  right: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
`;

const Title = styled.div`
  font-size: 18px;
  color: white;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export default Input;
