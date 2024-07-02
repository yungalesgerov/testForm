import React, { FC, useState, useEffect, useContext } from "react";
import DataContext from "../../../context/dataContext";
import { Box, Typography } from "@mui/material";

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

  const [time, setTime] = useState<number>(() => {
    const savedTime = localStorage.getItem("timer");
    return savedTime ? parseInt(savedTime) : initialTime;
  });
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (resetTimer) {
      setTime(initialTime);
      setIsActive(true);
      setResetTimer(false);
      localStorage.setItem("timer", initialTime.toString());
    }
  }, [resetTimer, initialTime, setResetTimer]);

  useEffect(() => {
    if (!isActive || time <= 0) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;
        localStorage.setItem("timer", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    if (time === 0 && isActive) {
      if (showTheResult) {
        showTheResult();
      }
      setIsActive(false);
      localStorage.removeItem("timer");
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
    <Box>
      <Typography variant="h6">{formatTime(time)}</Typography>
    </Box>
  );
};

export default Timer;
