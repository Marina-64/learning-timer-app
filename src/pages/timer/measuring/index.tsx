import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useTimer from "@/hooks/useTimer";
import { saveStartTime } from "../../../utils/supabaseFunction";
import { supabase } from "../../../utils/supabase"; // Supabaseインスタンスのインポート

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

  const handleStop = async () => {
    const endTime = new Date(); // 終了時間

    try {
      const email = "example@email.com"; // 仮のメールアドレス

      // 最新の開始時間を取得
      const { data: latestSession, error } = await supabase
        .from("timer")
        .select("id, start_time")
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(1)
        .single(); // 'single'で1件取得

      if (error || !latestSession) {
        console.error("開始時間を取得できませんでした:", error);
        return;
      }

      const { id, start_time } = latestSession;

      // 勉強時間の計算（秒単位）
      const studyDurationInSeconds = Math.floor(
        (endTime.getTime() - new Date(start_time).getTime()) / 1000
      );

      // Supabaseに終了時間と勉強時間を保存
      const { error: updateError } = await supabase
        .from("timer")
        .update({
          end_time: endTime.toISOString(),
          study_duration: studyDurationInSeconds,
        })
        .eq("id", id);

      if (updateError) {
        console.error("終了時間と勉強時間の保存に失敗しました:", updateError);
        return;
      }

      console.log(`勉強時間: ${studyDurationInSeconds}秒`);
      router.push("/records");
    } catch (error) {
      console.error("終了処理に失敗しました:", error);
    }
  };

  // タイマー表示に使用する分と秒の計算
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const nextMinutes = Math.floor(breakTime / 60);
  const nextSeconds = breakTime % 60;
  const progress = (time / (isBreak ? breakTime : initialWorkTime)) * 100;

  return (
    <div className="text-center">
      {/* タイマー表示 */}
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
          {nextMinutes}:{nextSeconds.toString().padStart(2, "0")}
        </p>
      </div>

      {/* 一時停止または再開ボタン */}
      {isRunning ? (
        <button className="mt-4" onClick={handlePause}>
          {/* 一時停止ボタンのSVG */}
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
              d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      ) : (
        <button className="mt-4" onClick={handleResume}>
          {/* 再開ボタンのSVG */}
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
      )}

      {/* 停止ボタン */}
      <button className="mt-4 ml-9" onClick={handleStop}>
        {/* 停止ボタンのSVG */}
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
            d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
          />
        </svg>
      </button>
      <div>
        <progress
          className="progress w-72 progress-bar progress-accent"
          value={progress}
          max={100}
        ></progress>
      </div>
    </div>
  );
};

export default Measuring;
