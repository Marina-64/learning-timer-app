// ファイル名: timerService.ts

const startTimer = async () => {
  const startTime = new Date();
  const { data, error } = await supabase
    .from("timer_records")
    .insert([{ user_id: user.id, start_time: startTime }]);
  if (error) console.error(error);
};

const stopTimer = async () => {
  const endTime = new Date();
  // 経過時間を計算し、保存
};

const saveTimerState = async (remainingTime: number) => {
  const { data, error } = await supabase
    .from("timer_states")
    .insert([{ user_id: user.id, remaining_time: remainingTime }]);
  if (error) console.error(error);
};

const loadTimerState = async () => {
  const { data, error } = await supabase
    .from("timer_states")
    .select("remaining_time")
    .eq("user_id", user.id);
  if (data) setTimeLeft(data.remaining_time);
};
