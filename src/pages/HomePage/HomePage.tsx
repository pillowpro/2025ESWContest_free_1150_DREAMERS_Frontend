import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BottomNavigation } from '../../components/BottomNavigation';
import { authAPI } from '../../services';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // 로컬스토리지에서 기기 등록 완료 여부 체크
    const isDeviceRegistered = localStorage.getItem('DEVICE_REGISTERED');
    
    if (!isDeviceRegistered) {
      // 기기 등록이 안되어 있으면 기기 등록 페이지로 이동
      navigate('/device-register', { replace: true });
      return;
    }

    // 기기 등록이 완료된 사용자는 더미 데이터 로드
    const loadDummyData = () => {
      const dummyData = {
        upcoming_alarms: [
          {
            id: "1",
            alarm_time: "07:30",
            label: "출근 준비",
            is_enabled: true,
            smart_wake: true,
            days: ["mon", "tue", "wed", "thu", "fri"]
          }
        ],
        sleep_summary: {
          last_night_score: 85,
          last_night_quality: "좋음",
          last_night_duration: 7.5,
          consistency_score: 78,
          week_average: 82,
          month_average: 79
        },
        quick_stats: {
          total_nights_tracked: 45,
          average_sleep_duration: 7.2,
          best_sleep_score: 96,
          consistency_streak: 12,
          sleep_efficiency: 88
        }
      };
      
      setDashboardData(dummyData);
      setLoading(false);
    };

    // 실제 로딩 시간을 시뮬레이션
    setTimeout(() => {
      loadDummyData();
    }, 1000);
  }, [navigate]);

  const handleSleepScoreClick = () => {
    navigate('/sleep-detail/2024.08.15');
  };

  if (loading) {
    return (
      <Container>
        <GradientHeader />
        <LoadingContainer>
          <LoadingText>데이터를 불러오는 중...</LoadingText>
        </LoadingContainer>
        <BottomNavigation />
      </Container>
    );
  }

  if (error || !dashboardData) {
    return (
      <Container>
        <GradientHeader />
        <ErrorContainer>
          <ErrorText>{error || '데이터를 불러올 수 없습니다.'}</ErrorText>
        </ErrorContainer>
        <BottomNavigation />
      </Container>
    );
  }

  return (
    <Container>
      <GradientHeader />
      
      <GreetingContainer>
        <GreetingText>
          안녕히 주무셨어요?{'\n'}
          이동현님
        </GreetingText>
      </GreetingContainer>
      
      <AlarmCard>
        <CardHeader>
          <SectionTitle>알람 설정</SectionTitle>
          <AlarmStatus $isEnabled={dashboardData.upcoming_alarms?.length > 0 && dashboardData.upcoming_alarms[0]?.is_enabled}>
            {dashboardData.upcoming_alarms?.length > 0 && dashboardData.upcoming_alarms[0]?.is_enabled ? 'ON' : 'OFF'}
          </AlarmStatus>
        </CardHeader>
        
        <AlarmTimeContainer>
          {dashboardData.upcoming_alarms?.length > 0 ? (
            <AlarmTime>{dashboardData.upcoming_alarms[0].alarm_time}</AlarmTime>
          ) : (
            <AlarmTime>--:--</AlarmTime>
          )}
          <AlarmLabel>
            {dashboardData.upcoming_alarms?.length > 0 
              ? dashboardData.upcoming_alarms[0].label 
              : '알람이 설정되지 않았습니다'
            }
          </AlarmLabel>
          {dashboardData.upcoming_alarms?.length > 0 && dashboardData.upcoming_alarms[0]?.smart_wake && (
            <SmartWakeTag>스마트 알람</SmartWakeTag>
          )}
        </AlarmTimeContainer>
      </AlarmCard>
      
      <ScoreDetailCard onClick={handleSleepScoreClick}>
        <CardHeader>
          <SectionTitle>수면 점수</SectionTitle>
          <ArrowIcon />
        </CardHeader>
        
        <ScoreInfo>
          <ScoreMain>
            <ScoreValue>{dashboardData.sleep_summary.last_night_score}점</ScoreValue>
            <ScoreStatus>{dashboardData.sleep_summary.last_night_quality}</ScoreStatus>
          </ScoreMain>
          <Divider />
        </ScoreInfo>
        
        <SleepProgressContainer>
          <ProgressItem>
            <ProgressLabel>수면 시간</ProgressLabel>
            <ProgressBar>
              <ProgressFill $width={(dashboardData.sleep_summary.last_night_duration / 8) * 100} />
            </ProgressBar>
            <ProgressText>{dashboardData.sleep_summary.last_night_duration}시간</ProgressText>
          </ProgressItem>
          
          <ProgressItem>
            <ProgressLabel>수면 효율</ProgressLabel>
            <ProgressBar>
              <ProgressFill $width={dashboardData.quick_stats.sleep_efficiency} />
            </ProgressBar>
            <ProgressText>{dashboardData.quick_stats.sleep_efficiency}%</ProgressText>
          </ProgressItem>
          
          <ProgressItem>
            <ProgressLabel>일관성 점수</ProgressLabel>
            <ProgressBar>
              <ProgressFill $width={dashboardData.sleep_summary.consistency_score} />
            </ProgressBar>
            <ProgressText>{dashboardData.sleep_summary.consistency_score}%</ProgressText>
          </ProgressItem>
          
          <ProgressItem>
            <ProgressLabel>주간 평균</ProgressLabel>
            <ProgressBar>
              <ProgressFill $width={dashboardData.sleep_summary.week_average} />
            </ProgressBar>
            <ProgressText>{dashboardData.sleep_summary.week_average}점</ProgressText>
          </ProgressItem>
          
          <ProgressItem>
            <ProgressLabel>월간 평균</ProgressLabel>
            <ProgressBar>
              <ProgressFill $width={dashboardData.sleep_summary.month_average} />
            </ProgressBar>
            <ProgressText>{dashboardData.sleep_summary.month_average}점</ProgressText>
          </ProgressItem>
        </SleepProgressContainer>
      </ScoreDetailCard>
      
      <ReportCard>
        <CardHeader>
          <SectionTitle>수면 리포트</SectionTitle>
        </CardHeader>
        
        <ReportGrid>
          <ReportItem>
            <ReportLabel>총 기록 일수</ReportLabel>
            <ReportValue>{dashboardData.quick_stats.total_nights_tracked}일</ReportValue>
          </ReportItem>
          
          <ReportItem>
            <ReportLabel>평균 수면 시간</ReportLabel>
            <ReportValue>{dashboardData.quick_stats.average_sleep_duration}시간</ReportValue>
          </ReportItem>
          
          <ReportItem>
            <ReportLabel>최고 수면 점수</ReportLabel>
            <ReportValue>{dashboardData.quick_stats.best_sleep_score}점</ReportValue>
          </ReportItem>
          
          <ReportItem>
            <ReportLabel>연속 기록</ReportLabel>
            <ReportValue>{dashboardData.quick_stats.consistency_streak}일</ReportValue>
          </ReportItem>
        </ReportGrid>
      </ReportCard>
      
      <BottomSpacing />
      
      <BottomNavigation />
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

const AlarmCard = styled.div`
  margin: 0 20px 20px;
  padding: 24px;
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const AlarmStatus = styled.div<{ $isEnabled: boolean }>`
  padding: 4px 12px;
  background: ${({ $isEnabled }) => $isEnabled ? '#3694CE' : '#D1D1D1'};
  color: ${({ $isEnabled }) => $isEnabled ? '#FFFFFF' : '#6D6D6D'};
  border-radius: 12px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
`;

const AlarmTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const AlarmTime = styled.div`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 57px;
  letter-spacing: -0.02em;
  color: #000000;
`;

const AlarmLabel = styled.div`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #6D6D6D;
`;

const SmartWakeTag = styled.div`
  padding: 4px 8px;
  background: #E8F4FD;
  color: #3694CE;
  border-radius: 6px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  position: relative;
  z-index: 1;
`;

const LoadingText = styled.div`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #FFFFFF;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  position: relative;
  z-index: 1;
`;

const ErrorText = styled.div`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #FFFFFF;
  text-align: center;
`;

const ScoreDetailCard = styled.div`
  margin: 0 20px 20px;
  padding: 32px 24px;
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
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

const SectionTitle = styled.h3`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 15.51px;
  letter-spacing: -0.02em;
  color: #000000;
  margin: 0;
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

const ProgressText = styled.span`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 16.71px;
  color: #3694CE;
  margin-top: 4px;
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
