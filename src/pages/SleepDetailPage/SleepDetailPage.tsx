import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";

// 더미 데이터
const sleepMovementData = [
  { time: "22:00", movement: 2 },
  { time: "23:00", movement: 8 },
  { time: "00:00", movement: 15 },
  { time: "01:00", movement: 3 },
  { time: "02:00", movement: 1 },
  { time: "03:00", movement: 0 },
  { time: "04:00", movement: 2 },
  { time: "05:00", movement: 12 },
  { time: "06:00", movement: 25 },
  { time: "07:00", movement: 18 },
];

const heartRateData = [
  { time: "22:00", rate: 68 },
  { time: "23:00", rate: 65 },
  { time: "00:00", rate: 62 },
  { time: "01:00", rate: 58 },
  { time: "02:00", rate: 55 },
  { time: "03:00", rate: 54 },
  { time: "04:00", rate: 56 },
  { time: "05:00", rate: 59 },
  { time: "06:00", rate: 64 },
  { time: "07:00", rate: 72 },
];

const snoringData = [
  { time: "22:00", intensity: 0 },
  { time: "23:00", intensity: 2 },
  { time: "00:00", intensity: 5 },
  { time: "01:00", intensity: 8 },
  { time: "02:00", intensity: 12 },
  { time: "03:00", intensity: 15 },
  { time: "04:00", intensity: 10 },
  { time: "05:00", intensity: 6 },
  { time: "06:00", intensity: 3 },
  { time: "07:00", intensity: 1 },
];

const sleepSummaries = [
  "깊은 잠에 빠져 안정적인 수면을 취했습니다.",
  "수면 중 뒤척임이 적어 양질의 휴식을 취했습니다.",
  "심박수가 안정적으로 유지되어 건강한 수면이었습니다.",
  "약간의 코골이가 있었지만 전반적으로 좋은 수면이었습니다.",
  "수면 패턴이 규칙적이어서 충분한 휴식을 취했습니다.",
];

const SleepDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { date } = useParams<{ date: string }>();
  
  const handleBack = () => {
    navigate(-1);
  };

  // 랜덤 수면 요약 선택
  const randomSummary = sleepSummaries[Math.floor(Math.random() * sleepSummaries.length)];

  return (
    <Container>
      <GradientHeader />
      
      <Header>
        <BackButton onClick={handleBack}>
          <BackIcon />
        </BackButton>
        <HeaderTitle>수면 상세 기록</HeaderTitle>
        <DateText>{date || "2024.08.15"}</DateText>
      </Header>

      <ContentContainer>
        <SleepScore>
          <ScoreTitle>수면 점수</ScoreTitle>
          <ScoreValue>85</ScoreValue>
          <ScoreSubtext>좋은 수면</ScoreSubtext>
        </SleepScore>

        <SummaryCard>
          <SummaryTitle>수면 요약</SummaryTitle>
          <SummaryText>{randomSummary}</SummaryText>
        </SummaryCard>

        <ChartCard>
          <ChartTitle>수면 중 뒤척임</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={sleepMovementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Area
                  type="monotone"
                  dataKey="movement"
                  stroke="#3694CE"
                  fill="#3694CE"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
          <ChartDescription>뒤척임이 적을수록 깊은 잠을 의미합니다</ChartDescription>
        </ChartCard>

        <ChartCard>
          <ChartTitle>수면 중 심박수</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis 
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  domain={['dataMin - 5', 'dataMax + 5']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#FF6B6B"
                  strokeWidth={2}
                  dot={{ fill: '#FF6B6B', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#FF6B6B', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <ChartDescription>수면 중 심박수가 안정적으로 유지되었습니다</ChartDescription>
        </ChartCard>

        <ChartCard>
          <ChartTitle>수면 중 코골이</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={snoringData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis 
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Area
                  type="monotone"
                  dataKey="intensity"
                  stroke="#FFA726"
                  fill="#FFA726"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
          <ChartDescription>새벽 2-4시경 코골이 강도가 높았습니다</ChartDescription>
        </ChartCard>
      </ContentContainer>

      <BottomSpacing />
      <BottomNavigation />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 412px;
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  overflow-x: hidden;
  margin: 0 auto;
`;

const GradientHeader = styled.div`
  width: 100%;
  max-width: 412px;
  height: 200px;
  background: linear-gradient(180deg, #56a8da 0%, #3694ce 100%);
  border-radius: 0px 0px 80px 80px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
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
  position: absolute;
  left: 24px;
  top: 60px;
`;

const BackIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #ffffff;
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 12H5' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12 19L5 12L12 5' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center;
  mask-size: 24px 24px;
`;

const HeaderTitle = styled.h1`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  margin: 0;
  text-align: center;
`;

const DateText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const ContentContainer = styled.div`
  background: #f4f4f4;
  border-radius: 30px;
  margin: 0 24px;
  padding: 24px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SleepScore = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
`;

const ScoreTitle = styled.h3`
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  margin: 0 0 8px 0;
`;

const ScoreValue = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: #3694CE;
  margin: 8px 0;
`;

const ScoreSubtext = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  margin: 0;
`;

const SummaryCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
`;

const SummaryTitle = styled.h3`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #333333;
  margin: 0 0 12px 0;
`;

const SummaryText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
  margin: 0;
`;

const ChartCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
`;

const ChartTitle = styled.h3`
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #333333;
  margin: 0 0 16px 0;
  text-align: center;
`;

const ChartContainer = styled.div`
  width: 100%;
  margin: 16px 0;
`;

const ChartDescription = styled.p`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #999999;
  margin: 8px 0 0 0;
  text-align: center;
`;

const BottomSpacing = styled.div`
  height: 100px;
  background: #ffffff;
`;

export default SleepDetailPage;