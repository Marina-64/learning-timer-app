import React from "react";

interface Props {
  time: number;
  onChange: (newTime: number) => void;
  nextTime: number;
}

const TimerSettingForm: React.FC<Props> = ({ time, nextTime }) => {
  const minutes = Math.floor(time / 60);
  const seconds = 0;
  const nextMinutes = Math.floor(nextTime / 60);
  const nextSeconds = nextTime % 60;

  return (
    <div>
      <h2>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </h2>
      <p>
        next {nextMinutes}:{nextSeconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
};

export default TimerSettingForm;
