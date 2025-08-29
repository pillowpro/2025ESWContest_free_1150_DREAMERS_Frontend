import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { androidAPI } from '../../services';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveTab = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/report') return 'report';
    if (location.pathname === '/profile') return 'profile';
    return 'home';
  };
  
  const handleTabChange = async (tab: 'home' | 'report' | 'profile') => {
    try {
      await androidAPI.vibrateOnce(50, false);
    } catch (error) {
      console.log('Vibration not available:', error);
    }

    switch (tab) {
      case 'home':
        navigate('/');
        break;
      case 'report':
        navigate('/report');
        break;
      case 'profile':
        navigate('/profile');
        break;
    }

    // 페이지 이동 시 스크롤을 맨 위로
    window.scrollTo(0, 0);
  };

  const activeTab = getActiveTab();

  return (
    <Container>
      <NavItem 
        $active={activeTab === 'home'} 
        onClick={() => handleTabChange('home')}
        $position="home"
      >
        <HomeIcon $active={activeTab === 'home'} />
      </NavItem>
      
      <NavItem 
        $active={activeTab === 'report'} 
        onClick={() => handleTabChange('report')}
        $position="report"
      >
        <ReportIcon $active={activeTab === 'report'} />
      </NavItem>
      
      <NavItem 
        $active={activeTab === 'profile'} 
        onClick={() => handleTabChange('profile')}
        $position="profile"
      >
        <ProfileIcon $active={activeTab === 'profile'} />
      </NavItem>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100vw;
  max-width: 412px;
  height: 80px;
  background: #FFFFFF;
  box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.15);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 12px;
`;

const NavItem = styled.button<{ $active: boolean; $position: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 50px;
  
  &:first-child {
    margin-left: 0;
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

const HomeIcon = styled.div<{ $active: boolean }>`
  width: 36px;
  height: 36px;
  background: ${({ $active }) => $active ? '#3694CE' : '#000000'};
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9 22V12H15V22' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center;
  mask-size: 24px 24px;
`;

const ReportIcon = styled.div<{ $active: boolean }>`
  width: 36px;
  height: 36px;
  background: ${({ $active }) => $active ? '#3694CE' : '#000000'};
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 2V8H20' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M16 13H8' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M16 17H8' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10 9H9H8' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center;
  mask-size: 24px 24px;
`;

const ProfileIcon = styled.div<{ $active: boolean }>`
  width: 36px;
  height: 36px;
  background: ${({ $active }) => $active ? '#3694CE' : '#000000'};
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='12' cy='7' r='4' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center;
  mask-size: 24px 24px;
`;

export default BottomNavigation;
