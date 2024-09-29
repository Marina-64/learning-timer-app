import React from "react";

const TimerWithProgress: React.FC<{
  time: number;
  nextTime: number;
  isBreak: boolean;
}> = ({ time, nextTime, isBreak }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const nextMinutes = Math.floor(nextTime / 60);
  const nextSeconds = nextTime % 60;
  const progress = (time / (isBreak ? 5 * 60 : 25 * 60)) * 100;

  return (
    <div>
      <h2>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </h2>
      <p>
        next {nextMinutes}:{nextSeconds.toString().padStart(2, "0")}
      </p>
      <progress value={progress} max={100} />
    </div>
  );
};

export default TimerWithProgress;
