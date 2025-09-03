import styled from "styled-components";

interface Prop {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ text, onClick, disabled = false }: Prop) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      console.log('Button clicked:', text);
      onClick();
    }
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
    background-color: ${(props) => (props.disabled ? "#d1d1d1" : "#2a7ba8")};
    transform: ${(props) => (props.disabled ? "none" : "scale(0.98)")};
  }

  &:hover {
    background-color: ${(props) => (props.disabled ? "#d1d1d1" : "#2a7ba8")};
  }
`;

export default Button;
