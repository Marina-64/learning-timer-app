import { supabase } from "../utils/supabase";

export const getAllTimers = async () => {
  const Timer = await supabase.from("timer").select("*");
  return Timer.data;
};
