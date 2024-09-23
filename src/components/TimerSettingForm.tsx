import { useEffect, useState } from "react";

const TimerSettingForm: React.FC = () => {
  //React.FCは関数型コンポーネントである
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25分のタイマー
  const [isRunning, setIsRunning] = useState(false); //タイマーの動作、初期値は停止中

  // タイマーの操作を管理
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      //タイマーが動作中で残り時間が0より大きい場合、1秒ごとに残り時間を1秒ずつ減らす
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // 1000ミリ秒
      // JavaScriptにおけるタイマー関数は、ミリ秒単位で時間を指定。1秒は1000ミリ秒であるため、1秒ごとに何かを実行したい場合、1000を指定。
    } else if (timeLeft === 0) {
      alert("時間です！休憩しましょう！");
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl mb-4">
        {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
        {timeLeft % 60}
      </h1>
      <div className="flex space-x-4">
        <button className="btn btn-circle</div>" onClick={startTimer}>
          Start
        </button>
        <button className="btn btn-circle" onClick={stopTimer}>
          Stop
        </button>
        <button className="btn btn-circle" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerSettingForm;
