import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDates } from "../utils/generate-dates";
import { DayHabits } from "./DayHabits";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDates();
const summaryDatesSize = (18 * 7);
const daysToFill = (summaryDatesSize - summaryDates.length);

type Summary = Array<{
    id: string,
    date: string,
    amount: number,
    completed: number
}>

export function SummaryTable() {
    const [summary, setSummary] = useState<Summary>([]);
  
    useEffect(() => {
        api.get('/summary')
            .then(response => setSummary(response.data))
            .catch(reject => console.error(reject));
    }, []);

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => {
                    return (
                        <div key={i} className="text-zinc-400 text-xl font-bold h-9 w-9 flex items-center justify-center">
                            {weekDay}
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summary.length > 0 && summaryDates.map(summaryDate => {
                    const dayInSummary = summary.find(day => {
                        return dayjs(summaryDate).isSame(day.date, 'day');
                    });

                    return (
                        <DayHabits
                            key={summaryDate.toString()}    
                            date={summaryDate}
                            amount={dayInSummary?.amount}
                            defaultCompleted={dayInSummary?.completed}
                        />
                    )
                })}
                {daysToFill > 0 && Array.from({ length: daysToFill }).map((_, i) => {
                    return (
                        <div key={i} className="text-zinc-900 w-9 h-9 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"/>
                    )
                })}
            </div>
        </div>
    )
}