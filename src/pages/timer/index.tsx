import React from "react";
import { useRouter } from "next/router";
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

  // 時間表示やフォーム部分を直接記述
  const minutes = Math.floor(time / 60);
  const seconds = 0;
  const nextMinutes = Math.floor(breakTime / 60);
  const nextSeconds = breakTime % 60;

  return (
    <div className="text-center">
      <div>
        <h2 className="font-semibold text-4xl mt-6 text-center">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </h2>
        <div className="flex justify-center items-center gap-1 mt-3">
          <div>
            {/* 次の計測時間表示SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          </div>
          <p className="text-center">
            {/* 次の計測時間表示 */}
            {nextMinutes}:{nextSeconds.toString().padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* スタート */}
      <button className="mt-4" onClick={handleStart}>
        {/* スタートボタンに表示するSVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Home;
