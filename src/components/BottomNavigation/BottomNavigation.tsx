import React from 'react';
import styled from 'styled-components';

interface BottomNavigationProps {
  activeTab: 'home' | 'report' | 'profile';
  onTabChange: (tab: 'home' | 'report' | 'profile') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <Container>
      <NavItem 
        $active={activeTab === 'home'} 
        onClick={() => onTabChange('home')}
        $position="home"
      >
        <HomeIcon $active={activeTab === 'home'} />
      </NavItem>
      
      <NavItem 
        $active={activeTab === 'report'} 
        onClick={() => onTabChange('report')}
        $position="report"
      >
        <ReportIcon $active={activeTab === 'report'} />
      </NavItem>
      
      <NavItem 
        $active={activeTab === 'profile'} 
        onClick={() => onTabChange('profile')}
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
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 412px;
  height: 80px;
  background: #FFFFFF;
  box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.15);
  z-index: 100;
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
  position: absolute;
  top: 12px;
  left: ${({ $position }) => 
    $position === 'home' ? '42px' : 
    $position === 'report' ? '188px' : 
    '334px'
  };
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