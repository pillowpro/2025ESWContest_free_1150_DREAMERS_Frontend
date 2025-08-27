import React from 'react';
import styled from 'styled-components';
import { BottomNavigation } from '../../components/BottomNavigation';

interface HomePageProps {
  onTabChange: (tab: 'home' | 'report' | 'profile') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onTabChange }) => {
  return (
    <Container>
      <GradientHeader />
      
      <GreetingContainer>
        <GreetingText>
          안녕히 주무셨어요?{'\n'}
          이동현님
        </GreetingText>
      </GreetingContainer>
      
      <SleepDataCard>
        <CardSection>
          <SectionTitle>지난 밤 수면 데이터</SectionTitle>
          <SleepTime>
            <TimeValue>5</TimeValue>
            <TimeLabel>시간</TimeLabel>
            <TimeValue>30</TimeValue>
            <TimeLabel>분</TimeLabel>
          </SleepTime>
        </CardSection>
        
        <CardSection>
          <SectionTitle>수면 점수</SectionTitle>
          <ScoreValue>65점</ScoreValue>
        </CardSection>
      </SleepDataCard>
      
      <ScoreDetailCard>
        <CardHeader>
          <SectionTitle>수면 점수</SectionTitle>
          <ArrowIcon />
        </CardHeader>
        
        <ScoreInfo>
          <ScoreMain>
            <ScoreValue>65점</ScoreValue>
            <ScoreStatus>좋음</ScoreStatus>
          </ScoreMain>
          <Divider />
        </ScoreInfo>
        
        <SleepProgressContainer>
          <ProgressItem>
            <ProgressLabel>수면 시간</ProgressLabel>
            <ProgressBar>
              <ProgressFill $width={60} />
            </ProgressBar>
          </ProgressItem>
          
          <ProgressItem>
            <ProgressLabel>수면 효율</ProgressLabel>
            <ProgressBar>
              <ProgressFill $width={45} />
            </ProgressBar>
          </ProgressItem>
          
          <ProgressItem>
            <ProgressLabel>깊은 잠</ProgressLabel>
            <ProgressBar>
              <ProgressFill $width={75} />
            </ProgressBar>
          </ProgressItem>
          
          <ProgressItem>
            <ProgressLabel>얕은 잠</ProgressLabel>
            <ProgressBar>
              <ProgressFill $width={30} />
            </ProgressBar>
          </ProgressItem>
          
          <ProgressItem>
            <ProgressLabel>REM 수면</ProgressLabel>
            <ProgressBar>
              <ProgressFill $width={90} />
            </ProgressBar>
          </ProgressItem>
        </SleepProgressContainer>
      </ScoreDetailCard>
      
      <ReportCard>
        <CardHeader>
          <SectionTitle>수면 리포트</SectionTitle>
          <ArrowIcon />
        </CardHeader>
        
        <ReportGrid>
          <ReportItem>
            <ReportLabel>코골이</ReportLabel>
            <ReportValue>총 10분</ReportValue>
          </ReportItem>
          
          <ReportItem>
            <ReportLabel>평균 심박</ReportLabel>
            <ReportValue>80 BPM</ReportValue>
          </ReportItem>
          
          <ReportItem>
            <ReportLabel>평균 체온</ReportLabel>
            <ReportValue>37.5 °C</ReportValue>
          </ReportItem>
          
          <ReportItem>
            <ReportLabel>뒤척임</ReportLabel>
            <ReportValue>심함</ReportValue>
          </ReportItem>
        </ReportGrid>
      </ReportCard>
      
      <BottomSpacing />
      
      <BottomNavigation activeTab="home" onTabChange={onTabChange} />
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
  padding-bottom: 80px;
  margin: 0 auto;
`;

const GradientHeader = styled.div`
  width: 100%;
  max-width: 412px;
  height: 416px;
  background: linear-gradient(180deg, #56A8DA 0%, #3694CE 100%);
  border-radius: 0 0 80px 80px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const GreetingContainer = styled.div`
  position: relative;
  z-index: 1;
  margin: 83px 20px 24px;
`;

const GreetingText = styled.h1`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 28.64px;
  letter-spacing: -0.01em;
  color: #FFFFFF;
  margin: 0;
  white-space: pre-line;
`;

const SleepDataCard = styled.div`
  margin: 0 20px 20px;
  padding: 24px;
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`;

const ScoreDetailCard = styled.div`
  margin: 0 20px 20px;
  padding: 32px 24px;
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const ReportCard = styled.div`
  margin: 0 20px 20px;
  padding: 24px;
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 15.51px;
  letter-spacing: -0.02em;
  color: #000000;
  margin: 0;
`;

const SleepTime = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const TimeValue = styled.span`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 600;
  font-size: 40px;
  line-height: 47.73px;
  letter-spacing: -0.02em;
  color: #000000;
`;

const TimeLabel = styled.span`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 600;
  font-size: 13px;
  line-height: 15.51px;
  letter-spacing: -0.02em;
  color: #000000;
`;

const ScoreValue = styled.span`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 600;
  font-size: 40px;
  line-height: 47.73px;
  letter-spacing: -0.02em;
  color: #000000;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ArrowIcon = styled.div`
  width: 20px;
  height: 20px;
  
  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background: #000000;
    mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 17L17 7M17 7H7M17 7V17' stroke='black' stroke-width='2'/%3E%3C/svg%3E") no-repeat center;
    mask-size: contain;
  }
`;

const ScoreInfo = styled.div`
  margin-bottom: 32px;
`;

const ScoreMain = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 16px;
`;

const ScoreStatus = styled.span`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 28.64px;
  letter-spacing: -0.02em;
  color: #6D6D6D;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #888888;
`;

const SleepProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ProgressItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProgressLabel = styled.span`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 15.51px;
  letter-spacing: -0.02em;
  color: #000000;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #D1D1D1;
  border-radius: 100px;
  position: relative;
`;

const ProgressFill = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}%;
  height: 100%;
  background: #3694CE;
  border-radius: 100px;
  position: absolute;
  left: 0;
  top: 0;
`;

const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 32px;
  margin-top: 24px;
`;

const ReportItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReportLabel = styled.span`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 19.09px;
  letter-spacing: -0.02em;
  color: #000000;
`;

const ReportValue = styled.span`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 23.87px;
  letter-spacing: -0.02em;
  color: #000000;
`;

const BottomSpacing = styled.div`
  height: 20px;
  background: #FFFFFF;
`;

export default HomePage;