import { getAllTimers } from "@/utils/supabaseFunction";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "react-bootstrap";

// supabaseを挿入
const [Timer, setTimer] = useState<any>([]);

useEffect(() => {
  const getTimers = async () => {
    const Timer = await getAllTimers();
    setTimer(Timer);
    console.log(Timer);
  };
  getTimers();
}, []);

const Home: React.FC = () => {
  return <div>Records</div>;
};

export default Home;
