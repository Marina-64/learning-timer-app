// Measuring.tsx
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import TimerWithProgress from "@/components/TimerWithProgress";
import useTimer from "@/hooks/useTimer";

const Measuring: React.FC = () => {
  const router = useRouter();
  const initialWorkTime: number = 25 * 60; // 25分
  const breakTime: number = 5 * 60; // 5分

  const { time, isBreak, isRunning, handlePause, handleResume } = useTimer(
    initialWorkTime,
    breakTime
  );

  useEffect(() => {
    // ページ遷移後にタイマーをスタート
    handleResume();
  }, []);

  const handleStop = () => {
    router.push("/records");
  };

  return (
    <div>
      <TimerWithProgress time={time} nextTime={breakTime} isBreak={isBreak} />
      {isRunning ? (
        <button onClick={handlePause}>一時停止</button>
      ) : (
        <button onClick={handleResume}>再開</button>
      )}
      <button onClick={handleStop}>停止</button>
    </div>
  );
};

export default Measuring;
