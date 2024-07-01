import React, { FC, useState, useEffect } from "react";
interface TimerProps {
  initialMinutes: number;
}

const Timer: FC<TimerProps> = (props) => {
  const { initialMinutes } = props;
  const [time, setTime] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

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
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Pause" : "Resume"}
      </button>
      <button onClick={() => setTime(initialMinutes * 60)}>Reset</button>
    </div>
  );
};

export default Timer;
