import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  isDestructive?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  isDestructive = false
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Backdrop onClick={handleBackdropClick}>
      <ModalContainer>
        <ModalContent>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalContent>
        
        <ButtonContainer>
          <CancelButton onClick={onClose}>
            {cancelText}
          </CancelButton>
          <ConfirmButton 
            onClick={handleConfirm}
            $isDestructive={isDestructive}
          >
            {confirmText}
          </ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 20px;
  width: 100%;
  max-width: 320px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  animation: modalSlideUp 0.3s ease-out;

  @keyframes modalSlideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalContent = styled.div`
  padding: 32px 24px 24px;
  text-align: center;
`;

const ModalTitle = styled.h3`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.4;
  color: #191f28;
  margin: 0 0 12px 0;
`;

const ModalDescription = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: #6b7684;
  margin: 0;
  white-space: pre-line;
`;

const ButtonContainer = styled.div`
  display: flex;
  border-top: 1px solid #f2f4f6;
`;

const BaseButton = styled.button`
  flex: 1;
  height: 56px;
  border: none;
  background: none;
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.15s ease;
  
  &:active {
    transform: scale(0.98);
  }
`;

const CancelButton = styled(BaseButton)`
  color: #8b95a1;
  border-right: 1px solid #f2f4f6;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const ConfirmButton = styled(BaseButton)<{ $isDestructive?: boolean }>`
  color: ${({ $isDestructive }) => $isDestructive ? '#ff5a5a' : '#3965ff'};
  font-weight: 700;
  
  &:hover {
    background: ${({ $isDestructive }) => 
      $isDestructive ? 'rgba(255, 90, 90, 0.05)' : 'rgba(57, 101, 255, 0.05)'
    };
  }
`;

export default Modal;