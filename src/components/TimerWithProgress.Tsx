import { useState, useEffect } from "react";

const TimerWithProgress: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(1500); //25分（1500秒）
  const [isRunning, setIsRunning] = useState(false); //タイマーの動作、初期値は停止中

  useEffect(() => {
    // タイマーの残り時間
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      //タイマーが動作中で残り時間が0より大きい場合
      timer = setInterval(() => {
        // 1秒ごとに残り時間を1秒ずつ減らす
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // 1000ミリ秒
    } else if (timeLeft === 0) {
      //タイマーの残り時間が0の場合
      alert("Finish!");
      setIsRunning(false); //タイマーの動作を停止
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1500);
  };

  const progressValue = 1500 - timeLeft; // プログレスを計算

  useEffect(() => {
    console.log("progress:", progressValue);
  }, [timeLeft]); // timeLeftが変更された時のみログ出力

  return (
    <div className="flex flex-col items-center">
      <p>
        {Math.floor(timeLeft / 60)}: {timeLeft % 60}
      </p>
      <div className="flex space-x-4">
        <button className="btn btn-primary" onClick={startTimer}>
          スタート
        </button>
        <button className="btn btn-secondary" onClick={stopTimer}>
          ストップ
        </button>
        <button className="btn btn-accent" onClick={resetTimer}>
          リセット
        </button>
      </div>
      <progress
        className="progress progress-primary"
        value={progressValue}
        max={1500}
      ></progress>
    </div>
  );
};

export default TimerWithProgress;
