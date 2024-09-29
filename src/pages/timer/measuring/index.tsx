import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TimerWithProgress from "@/components/TimerWithProgress";

const Measuring: React.FC = () => {
  const router = useRouter();
  const [time, setTime] = useState(25 * 60); // 25分
  const [nextTime, setNextTime] = useState(5 * 60); // 5分
  const [isRunning, setIsRunning] = useState(true);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRunning) {
        if (isBreak) {
          if (time <= 0) {
            setIsBreak(false);
            setTime(25 * 60);
          } else {
            setTime((prevTime) => prevTime - 1);
          }
        } else {
          if (time <= 0) {
            setIsBreak(true);
            setTime(5 * 60);
          } else {
            setTime((prevTime) => prevTime - 1);
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isBreak, time]);

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    router.push("/records");
  };

  return (
    <div>
      <h1></h1>
      <TimerWithProgress time={time} nextTime={nextTime} isBreak={isBreak} />
      <button onClick={handlePause}>一時停止</button>
      <button onClick={handleStop}>停止</button>
    </div>
  );
};

export default Measuring;
