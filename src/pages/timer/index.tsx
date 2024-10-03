import React from "react";
import { useRouter } from "next/router";
import TimerSettingForm from "@/components/TimerSettingForm";
import useTimer from "@/hooks/useTimer";

const Home: React.FC = () => {
  const router = useRouter();
  const initialWorkTime: number = 25 * 60; // 25分
  const breakTime: number = 5 * 60; // 5分
  const { time, setTime } = useTimer(initialWorkTime, breakTime); // 2つの引数を渡す

  const handleStart = () => {
    router.push("/timer/measuring");
  };

  // 時間が変更されたときに呼び出される関数
  const handleTimeChange = (newTime: number) => {
    setTime(newTime);
  };

  return (
    <div>
      <TimerSettingForm
        time={time}
        nextTime={breakTime}
        onChange={handleTimeChange}
      />
      <button onClick={handleStart}>スタート</button>
    </div>
  );
};

export default Home;
