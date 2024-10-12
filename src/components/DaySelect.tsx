import React from "react";
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline';

interface DaySelectProps {
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>
}


const DaySelect = (props: DaySelectProps) => {
    const thisYear = props.date.getFullYear();
    const thisMonth = props.date.getMonth() + 1;
    const thisDate = props.date.getDate();

    const handleChangeDate = (pager: string) => {
        if(pager === 'prev') {
            props.setDate(new Date(thisYear, thisMonth - 1));
        } else if(pager === 'next') {
            props.setDate(new Date(thisYear, thisMonth + 1));
        }
    }

    return(
        <div>
        <ChevronLeftIcon onClick={() => handleChangeDate('prev')}/>
        <h2 className="text-2xl">{thisYear}/{thisMonth}/{thisDate}</h2>
        <ChevronRightIcon onClick={() => handleChangeDate('prev')}/>
        </div>
    )
}

export default DaySelect;