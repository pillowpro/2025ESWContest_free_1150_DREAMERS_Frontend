import React from 'react';
import styled from 'styled-components';
import { BottomNavigation } from '../../components/BottomNavigation';

interface MyPageProps {
  onTabChange: (tab: 'home' | 'report' | 'profile') => void;
}

const MyPage: React.FC<MyPageProps> = ({ onTabChange }) => {
  return (
    <Container>
      <GradientHeader>
        <ProfileSection>
          <UserInfo>
            <UserName>이동현</UserName>
            <UserStatus>낮밤이 바뀌셨군요!</UserStatus>
          </UserInfo>
          <ProfileImage />
        </ProfileSection>
      </GradientHeader>
      
      <MenuContainer>
        <MenuItem>
          <MenuText>내 정보 수정</MenuText>
          <ArrowIcon />
        </MenuItem>
        
        <MenuItem>
          <MenuText>로그아웃</MenuText>
          <ArrowIcon />
        </MenuItem>
        
        <MenuItem>
          <MenuText $isDelete>회원 탈퇴</MenuText>
          <ArrowIcon />
        </MenuItem>
      </MenuContainer>
      
      <BottomSpacing />
      
      <BottomNavigation activeTab="profile" onTabChange={onTabChange} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 412px;
  min-height: 100vh;
  background: #F4F4F4;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 80px;
  margin: 0 auto;
`;

const GradientHeader = styled.div`
  width: 100%;
  height: 236px;
  background: linear-gradient(180deg, #56A8DA 0%, #3694CE 100%);
  border-radius: 0 0 50px 50px;
  position: relative;
  padding: 90px 36px 40px;
  margin-bottom: 40px;
`;

const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UserName = styled.h1`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 38.19px;
  letter-spacing: -0.01em;
  color: #FFFFFF;
  margin: 0;
`;

const UserStatus = styled.p`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 23.87px;
  letter-spacing: -0.016em;
  color: #E5F0F9;
  margin: 0;
`;

const ProfileImage = styled.div`
  width: 84px;
  height: 84px;
  background: #B0B0B0;
  border: 4px solid #E5F0F9;
  border-radius: 100px;
`;

const MenuContainer = styled.div`
  background: #FFFFFF;
  position: relative;
  z-index: 1;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 24px;
  min-height: 44px;
  border-bottom: 1px solid #F4F4F4;
  cursor: pointer;
  
  &:hover {
    background: rgba(54, 148, 206, 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const MenuText = styled.span<{ $isDelete?: boolean }>`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 19.09px;
  letter-spacing: -0.02em;
  color: ${({ $isDelete }) => $isDelete ? '#FF4444' : '#000000'};
`;

const ArrowIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 14px;
    background: #888888;
    mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 18L15 12L9 6' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center;
    mask-size: contain;
  }
`;

const BottomSpacing = styled.div`
  height: 20px;
  background: #F4F4F4;
`;

export default MyPage;