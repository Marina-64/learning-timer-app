import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

const Records: React.FC = () => {
  const [studyDuration, setStudyDuration] = useState<number | null>(null);

  useEffect(() => {
    const fetchLatestSession = async () => {
      const { data, error } = await supabase
        .from("timer")
        .select("study_duration")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        console.error("勉強記録の取得に失敗しました:", error);
        return;
      }

      setStudyDuration(data.study_duration);
    };

    fetchLatestSession();
  }, []);

  // 秒を「時間:分」の形式に変換する関数
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes < 60) {
      return `${minutes}分${remainingSeconds}秒`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}時間${remainingMinutes}分`;
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold">最新の勉強記録</h1>
      {studyDuration !== null ? (
        <h2 className="font-semibold text-4xl mt-6">
          {formatDuration(studyDuration)}
        </h2>
      ) : (
        <p>記録がありません。</p>
      )}
    </div>
  );
};

export default Records;
