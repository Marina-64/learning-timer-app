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
            props.setDate(new Date(thisYear, thisMonth, thisDate - 1));
        } else if(pager === 'next') {
            props.setDate(new Date(thisYear, thisMonth, thisDate + 1));
        }
    }

    return(
        <div className="flex items-center gap-2 mt-8">
        <ChevronLeftIcon className="h-5 w-5" onClick={() => handleChangeDate('prev')}/>
        <h2 className="text-2xl">{thisYear}/{thisMonth}/{thisDate}</h2>
        <ChevronRightIcon className="h-5 w-5" onClick={() => handleChangeDate('prev')}/>
        </div>
    )
}

export default DaySelect;