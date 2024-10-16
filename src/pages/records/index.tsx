import DaySelect from "@/components/DaySelect";
import React, {useState} from "react";

// supabaseを挿入

const Records: React.FC = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <DaySelect  date={date} setDate={setDate}/>
      Records
    </div>
  )
};

export default Records;
