import { supabase } from "../utils/supabase";

// 全てのタイマーを取得
export const getAllTimers = async () => {
  try {
    const { data, error } = await supabase.from("timer").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data; // データを返す
  } catch (error) {
    console.error("Error fetching timers:", error);
    return []; // エラー時は空配列
  }
};

// 最新の開始時間を取得（特定のユーザーの最新レコード）
export const fetchStartTime = async (
  email: string
): Promise<{ id: string; start_time: string } | null> => {
  try {
    const { data, error } = await supabase
      .from("timer")
      .select("id, start_time")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("開始時間の取得に失敗しました:", error);
      return null;
    }

    return data; // { id, start_time } を返す
  } catch (error) {
    console.error("fetchStartTimeでエラー:", error);
    return null;
  }
};

// 開始時間を保存
export const saveStartTime = async (
  email: string,
  study_title: string,
  start_time: string
) => {
  try {
    const { error } = await supabase.from("timer").insert({
      email,
      study_title,
      start_time,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("開始時間の保存に失敗しました:", error);
    throw error;
  }
};

// 終了時間と学習時間を更新
export const saveEndTimeAndDuration = async (
  id: string, // 更新対象のID
  end_time: string,
  study_duration: number
) => {
  try {
    const { error } = await supabase
      .from("timer")
      .update({ end_time, study_duration })
      .eq("id", id);

    if (error) {
      console.error("終了時間と学習時間の保存に失敗しました:", error);
      throw error;
    }
  } catch (error) {
    console.error("saveEndTimeAndDurationでエラー:", error);
    throw error;
  }
};
