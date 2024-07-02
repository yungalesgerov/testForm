import React, { FC, useState, useEffect, useContext } from "react";
import DataContext from "../../../context/dataContext";

interface TimerProps {
  initialMinutes: number;
  resetTimer: boolean;
  setResetTimer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer: FC<TimerProps> = ({
  initialMinutes,
  resetTimer,
  setResetTimer,
}) => {
  const { showTheResult } = useContext(DataContext);
  const initialTime = initialMinutes * 60;

  const [time, setTime] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (resetTimer) {
      setTime(initialTime);
      setIsActive(true);
      setResetTimer(false);
    }
  }, [resetTimer, initialTime, setResetTimer]);

  useEffect(() => {
    if (!isActive || time <= 0) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    if (time === 0 && isActive) {
      if (showTheResult) {
        showTheResult();
      }
      setIsActive(false);
    }
  }, [time, isActive, showTheResult]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
    </div>
  );
};

export default Timer;
