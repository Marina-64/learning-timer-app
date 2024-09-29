import React from "react";

const TimerSettingForm: React.FC<{ time: number; nextTime: number }> = ({
  time,
  nextTime,
}) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
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
