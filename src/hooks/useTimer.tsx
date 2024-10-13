import { useState, useEffect } from "react";

const useTimer = (initialTime: number, breakTime: number) => {
  const [time, setTime] = useState<number>(initialTime); // タイマーの現在の残り時間
  const [isRunning, setIsRunning] = useState<boolean>(false); // タイマーの状態
  const [isBreak, setIsBreak] = useState<boolean>(false); // 休憩の状態

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
    setIsRunning(false); // タイマーを一時停止
  };

  const handleResume = () => {
    setIsRunning(true); // タイマーを再開
  };

  return { time, setTime, isBreak, isRunning, handlePause, handleResume };
};

export default useTimer;
