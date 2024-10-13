// components/Timer.tsx
import { useState } from "react";
import { supabase } from "../utils/supabase";

const Timer = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("ユーザーのメールアドレス"); // ここに実際のユーザーのメールアドレスを設定
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const startTimer = () => {
    setStartTime(new Date());
    console.log("Timer started");
  };

  const stopTimer = async () => {
    if (startTime) {
      const endTime = new Date();
      const duration = (endTime.getTime() - startTime.getTime()) / 1000; // 経過時間を秒単位で計算
      setElapsedTime(duration);

      const { data, error } = await supabase
        .from("timer")
        .insert([{ Email: email, title: title, duration: duration }]); // Supabaseにデータを挿入
      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted successfully:", data);
      }
    }
  };
};
export default Timer;
