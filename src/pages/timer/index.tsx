import React, { useState } from "react";
import { useRouter } from "next/router";
import TimerSettingForm from "@/components/TimerSettingForm";

const Home: React.FC = () => {
  const router = useRouter();
  const [timerStarted, setTimerStarted] = useState(false);
  const [currentTimer, setCurrentTimer] = useState("work");
  const [time, setTime] = useState(25 * 60); // 25分

  const startTimer = () => {
    setTimerStarted(true);
    router.push("/timer/measuring");
  };

  const handleTimerEnd = () => {
    if (currentTimer === "work") {
      setCurrentTimer("break");
      setTime(5 * 60); // 5分
    } else {
      setCurrentTimer("work");
      setTime(25 * 60); // 25分
    }
  };

  return (
    <div>
      {timerStarted ? (
        <div>
          <h1>Recording</h1>
          <TimerSettingForm time={time} />
          <p>next {currentTimer === "work" ? "Break 5:00" : "Doing 25:00"}</p>
          <button onClick={() => setTimerStarted(false)}>停止</button>
        </div>
      ) : (
        <div>
          <TimerSettingForm time={time} />
          <button onClick={startTimer}>スタート</button>
        </div>
      )}
    </div>
  );
};

export default Home;
