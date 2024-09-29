import React, { useState } from "react";
import { useRouter } from "next/router";
import TimerSettingForm from "@/components/TimerSettingForm";

const Home: React.FC = () => {
  const router = useRouter();
  const [timerStarted, setTimerStarted] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25分
  const [nextTime, setNextTime] = useState(5 * 60); // 5分

  const startTimer = () => {
    setTimerStarted(true);
    router.push("/timer/measuring");
  };

  return (
    <div>
      {timerStarted ? (
        <div>
          <h1>計測中</h1>
          <TimerSettingForm time={time} nextTime={nextTime} />
          <button onClick={() => setTimerStarted(false)}>停止</button>
        </div>
      ) : (
        <div>
          <TimerSettingForm time={time} onChange={(time) => setTime(time)} />
          <button onClick={startTimer}>スタート</button>
        </div>
      )}
    </div>
  );
};

export default Home;
