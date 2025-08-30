import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

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

  const randomSummary =
    sleepSummaries[Math.floor(Math.random() * sleepSummaries.length)];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#E5E5E5',
          lineWidth: 1,
        },
        ticks: {
          color: '#666',
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#E5E5E5',
          lineWidth: 1,
        },
        ticks: {
          color: '#666',
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
    },
  };

  const sleepMovementData = {
    labels: ["22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"],
    datasets: [
      {
        data: [2, 8, 15, 3, 1, 0, 2, 12, 25, 18],
        borderColor: '#3694CE',
        backgroundColor: 'rgba(54, 148, 206, 0.3)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#3694CE',
        pointBorderColor: '#3694CE',
      },
    ],
  };

  const heartRateData = {
    labels: ["22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"],
    datasets: [
      {
        data: [68, 65, 62, 58, 55, 54, 56, 59, 64, 72],
        borderColor: '#FF6B6B',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#FF6B6B',
        pointBorderColor: '#FF6B6B',
      },
    ],
  };

  const snoringData = {
    labels: ["22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"],
    datasets: [
      {
        data: [0, 2, 5, 8, 12, 15, 10, 6, 3, 1],
        borderColor: '#FFA726',
        backgroundColor: 'rgba(255, 167, 38, 0.3)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#FFA726',
        pointBorderColor: '#FFA726',
      },
    ],
  };

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
            <Line data={sleepMovementData} options={chartOptions} />
          </ChartContainer>
          <ChartDescription>
            뒤척임이 적을수록 깊은 잠을 의미합니다
          </ChartDescription>
        </ChartCard>

        <ChartCard>
          <ChartTitle>수면 중 심박수</ChartTitle>
          <ChartContainer>
            <Line data={heartRateData} options={chartOptions} />
          </ChartContainer>
          <ChartDescription>
            수면 중 심박수가 안정적으로 유지되었습니다
          </ChartDescription>
        </ChartCard>

        <ChartCard>
          <ChartTitle>수면 중 코골이</ChartTitle>
          <ChartContainer>
            <Line data={snoringData} options={chartOptions} />
          </ChartContainer>
          <ChartDescription>
            새벽 2-4시경 코골이 강도가 높았습니다
          </ChartDescription>
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
  mask: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 12H5' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12 19L5 12L12 5' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
    no-repeat center;
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
  color: #3694ce;
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
  height: 200px;
  margin: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
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