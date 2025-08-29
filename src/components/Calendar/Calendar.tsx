import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface CalendarDay {
  date: number;
  color?: 'blue200' | 'blue300' | 'blue400' | 'blue500';
  isEmpty?: boolean;
}

interface CalendarProps {
  month: string;
  year?: string;
  days: CalendarDay[];
}

const Calendar: React.FC<CalendarProps> = ({ month, days }) => {
  const navigate = useNavigate();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDayClick = (date: number) => {
    if (date > 0 && date <= 31) {
      const formattedDate = `2024.${month === '8월' ? '08' : month === '9월' ? '09' : '10'}.${date.toString().padStart(2, '0')}`;
      navigate(`/sleep-detail/${formattedDate}`);
    }
  };
  
  // Split days into weeks (7 days each)
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  
  return (
    <Container>
      <MonthTitle>{month}</MonthTitle>
      
      <CalendarGrid>
        {/* Weekday headers */}
        <WeekDaysRow>
          {weekDays.map((day, index) => (
            <WeekDay key={index} $isWeekend={index === 0 || index === 6}>
              {day}
            </WeekDay>
          ))}
        </WeekDaysRow>
        
        {/* Calendar weeks */}
        {weeks.map((week, weekIndex) => (
          <WeekRow key={weekIndex}>
            {week.map((day, dayIndex) => (
              <DayCell
                key={dayIndex}
                $color={day.color}
                $isEmpty={day.isEmpty}
                onClick={() => !day.isEmpty && handleDayClick(day.date)}
                $clickable={!day.isEmpty}
              >
                {!day.isEmpty && (
                  <DayNumber $hasColor={!!day.color}>
                    {day.date}
                  </DayNumber>
                )}
              </DayCell>
            ))}
          </WeekRow>
        ))}
      </CalendarGrid>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const MonthTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.semibold};
  font-size: 20px;
  line-height: 1.19;
  letter-spacing: -1.6%;
  color: ${theme.colors.black};
`;

const CalendarGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const WeekDaysRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid ${theme.colors.gray[300]};
`;

const WeekDay = styled.div<{ $isWeekend: boolean }>`
  width: 36px;
  text-align: center;
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.medium};
  font-size: 15px;
  line-height: 1.19;
  letter-spacing: -2.13%;
  color: ${({ $isWeekend }) => $isWeekend ? '#BE6464' : theme.colors.gray[500]};
`;

const WeekRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2px;
`;

const DayCell = styled.div<{ $color?: string; $isEmpty?: boolean; $clickable?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $color }) => {
    switch ($color) {
      case 'blue200': return theme.colors.blue[200];
      case 'blue300': return theme.colors.blue[300];
      case 'blue400': return theme.colors.blue[400];
      case 'blue500': return theme.colors.blue[500];
      default: return 'transparent';
    }
  }};
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: ${({ $clickable }) => $clickable ? 'scale(1.1)' : 'none'};
  }
`;

const DayNumber = styled.span<{ $hasColor: boolean }>`
  font-family: ${theme.fonts.secondary};
  font-weight: ${theme.fontWeights.regular};
  font-size: 13px;
  line-height: 1.17;
  text-align: center;
  color: ${({ $hasColor }) => $hasColor ? theme.colors.white : '#1A1A1A'};
`;

export default Calendar;