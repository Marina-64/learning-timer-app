import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import BtnNav from "@/components/BtnNav";
import Image from "next/image";

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
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // 2桁表示にフォーマット
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(remainingMinutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div className="text-center">
      <div className="bg-[#4ADE80] text-white rounded-lg p-3 max-w-xs mx-auto mt-4">
        <h1 className="text-1xl font-semibold">励ましメッセージ</h1>
      </div>

      <div className="flex justify-center items-center mt-6">
        <p className="mr-4">total</p> {/* 右にマージンを追加 */}
        {studyDuration !== null ? (
          <h2 className="font-semibold text-4xl">
            {formatDuration(studyDuration)}
          </h2>
        ) : (
          <p>記録がありません。</p>
        )}
      </div>

      <div>
        <Image
          src="/appleTree.jpg"
          alt="appleTree.jpg"
          width={360}
          height={520}
          className="inline-block"
        />
      </div>

      <BtnNav />
    </div>
  );
};

export default Records;
