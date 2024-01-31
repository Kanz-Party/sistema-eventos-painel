import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface TimerProps {
  expirationDate: string;
}

const TimerContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`;

const Timer: React.FC<TimerProps> = ({ expirationDate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  const parseDate = (dateString: string): Date => {
    const [date, time] = dateString.split(' ');
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
  };

  const formatTimeLeft = (difference: number): string => {
    const totalMinutes = Math.floor(difference / (1000 * 60));
    const seconds = Math.floor((difference / 1000) % 60);
    return `${totalMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expiration = parseDate(expirationDate);
      const difference = expiration.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft(formatTimeLeft(difference));
      } else {
        setTimeLeft('00:00');
        clearInterval(interval);
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationDate]);

  return <TimerContainer>{timeLeft}</TimerContainer>;
};

export default Timer;
