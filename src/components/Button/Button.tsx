import styled from "styled-components";
import { AndroidBridge } from "../../services";

const androidBridge = new AndroidBridge();

interface Prop {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ text, onClick, disabled = false }: Prop) => {
  const handleClick = (e: React.MouseEvent) => {
    androidBridge.logToConsole('info', `[Button] Click event - text: ${text}, disabled: ${disabled}, hasOnClick: ${!!onClick}, eventType: ${e.type}`, 'Button');
    
    if (disabled) {
      androidBridge.logToConsole('warn', `[Button] Click ignored - button "${text}" is disabled`, 'Button');
      return;
    }
    
    if (!onClick) {
      androidBridge.logToConsole('warn', `[Button] Click ignored - no onClick handler for "${text}"`, 'Button');
      return;
    }
    
    androidBridge.logToConsole('info', `[Button] Executing onClick for: ${text}`, 'Button');
    onClick();
  };

  return (
    <ButtonContainer
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 48px;
  background-color: ${(props) => (props.disabled ? "#d1d1d1" : "#3594CE")};
  border-radius: 20px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.disabled ? "#999" : "white")};
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:active {
    background-color: ${(props) => (props.disabled ? "#d1d1d1" : "#1e5f82")} !important;
    transform: ${(props) => (props.disabled ? "none" : "scale(0.95)")} !important;
    box-shadow: ${(props) => (props.disabled ? "none" : "inset 0 2px 4px rgba(0,0,0,0.3)")} !important;
  }

  &:hover {
    background-color: ${(props) => (props.disabled ? "#d1d1d1" : "#2a7ba8")};
  }

  /* 터치 디바이스용 추가 스타일 */
  @media (hover: none) and (pointer: coarse) {
    &:active {
      background-color: ${(props) => (props.disabled ? "#d1d1d1" : "#1e5f82")} !important;
      transform: ${(props) => (props.disabled ? "none" : "scale(0.95)")} !important;
    }
  }
`;

export default Button;
