import React from 'react';
import styled from 'styled-components';
import { Calendar } from '../../components/Calendar';

interface MonthlyReportPageProps {
  onBack: () => void;
}

// Sample data for August calendar
const augustDays = [
  // Week 1
  { date: 1, isEmpty: true },
  { date: 1, isEmpty: true },
  { date: 1, isEmpty: true },
  { date: 1, isEmpty: true },
  { date: 1, isEmpty: true },
  { date: 1, color: 'blue200' as const },
  { date: 2, color: 'blue300' as const },
  // Week 2
  { date: 3, color: 'blue400' as const },
  { date: 4, color: 'blue500' as const },
  { date: 5 },
  { date: 6 },
  { date: 7 },
  { date: 8 },
  { date: 9 },
  // Week 3
  { date: 10 },
  { date: 11 },
  { date: 12 },
  { date: 13 },
  { date: 14 },
  { date: 15 },
  { date: 16 },
  // Week 4
  { date: 17, color: 'blue200' as const },
  { date: 18, color: 'blue300' as const },
  { date: 19, color: 'blue400' as const },
  { date: 20, color: 'blue500' as const },
  { date: 21 },
  { date: 22 },
  { date: 23 },
  // Week 5
  { date: 24 },
  { date: 25 },
  { date: 26 },
  { date: 27 },
  { date: 28 },
  { date: 29 },
  { date: 30 },
  // Week 6
  { date: 31 },
  { date: 1, isEmpty: true },
  { date: 1, isEmpty: true },
  { date: 1, isEmpty: true },
  { date: 1, isEmpty: true },
  { date: 1, isEmpty: true },
  { date: 1, isEmpty: true },
];

// Sample data for September calendar
const septemberDays = [
  // Week 1
  { date: 1, isEmpty: true },
  { date: 1 },
  { date: 2 },
  { date: 3 },
  { date: 4 },
  { date: 5 },
  { date: 6 },
  // Week 2
  { date: 7 },
  { date: 8 },
  { date: 9 },
  { date: 10 },
  { date: 11 },
  { date: 12 },
  { date: 13 },
  // Week 3
  { date: 14 },
  { date: 15 },
  { date: 16 },
  { date: 17 },
  { date: 18 },
  { date: 19 },
  { date: 20 },
  // Week 4
  { date: 21 },
  { date: 22 },
  { date: 23 },
  { date: 24 },
  { date: 25 },
  { date: 26 },
  { date: 27 },
  // Week 5
  { date: 28 },
  { date: 29 },
  { date: 30 },
  { date: 1, isEmpty: true },
  { date: 1, isEmpty: true },
  { date: 1, isEmpty: true },
  { date: 1, isEmpty: true },
];

const MonthlyReportPage: React.FC<MonthlyReportPageProps> = ({ onBack }) => {
  return (
    <Container>
      <GradientHeader />
      
      <Header>
        <BackButton onClick={onBack}>
          <BackIcon />
        </BackButton>
        <HeaderTitle>수면 기록</HeaderTitle>
      </Header>
      
      <ContentContainer>
        <CalendarContainer>
          <Calendar month="8월" days={augustDays} />
        </CalendarContainer>
        
        <CalendarContainer>
          <Calendar month="9월" days={septemberDays} />
        </CalendarContainer>
        
        <CalendarContainer>
          <Calendar month="10월" days={septemberDays} />
        </CalendarContainer>
      </ContentContainer>
      
      <BottomSpacing />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 412px;
  min-height: 100vh;
  background: #FFFFFF;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 20px;
  margin: 0 auto;
`;

const GradientHeader = styled.div`
  width: 100%;
  max-width: 412px;
  height: 416px;
  background: linear-gradient(180deg, #56A8DA 0%, #3694CE 100%);
  border-radius: 0px 0px 80px 80px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 60px 24px 24px;
  position: relative;
  z-index: 1;
`;

const BackButton = styled.button`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackIcon = styled.div`
  width: 16px;
  height: 16px;
  
  &::before {
    content: '';
    display: block;
    width: 9.17px;
    height: 17.41px;
    background: #FFFFFF;
    mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 18L9 12L15 6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center;
    mask-size: contain;
  }
`;

const HeaderTitle = styled.h1`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 23.87px;
  letter-spacing: -0.016em;
  color: #FFFFFF;
  margin: 0;
`;

const ContentContainer = styled.div`
  background: #F4F4F4;
  border-radius: 30px;
  margin: 0 24px;
  padding: 24px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-height: calc(100vh - 200px);
`;

const CalendarContainer = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
`;

const BottomSpacing = styled.div`
  height: 20px;
  background: #FFFFFF;
`;

export default MonthlyReportPage;