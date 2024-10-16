import { getAllTimers } from "@/utils/supabaseFunction";
import React, { useEffect, useState } from "react";
import "daisyui/dist/full.css";

// supabaseを挿入
const Home: React.FC = () => {
  // supabaseからタイマーを取得するためのstate
  const [Timer, setTimer] = useState<any>([]);

  useEffect(() => {
    const getTimers = async () => {
      const Timer = await getAllTimers();
      setTimer(Timer);
      console.log(Timer);
    };

    getTimers();
  }, []); // コンポーネントがマウントされたときに実行

  return <div>Records</div>;
>>>>>>> main
};

export default Records;
