import { generateDates } from "../utils/generate-dates";
import { DayHabits } from "./DayHabits";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDates();
const summaryDatesSize = (18 * 7);
const daysToFill = (summaryDatesSize - summaryDates.length);

export function SummaryTable() {
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => {
                    return (
                        <div key={i} className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center">
                            {weekDay}
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summaryDates.map(summaryDate => {
                    return (
                        <DayHabits
                            key={summaryDate.toString()}
                            amount={5}
                            completed={1}
                        />
                    )
                })}
                {daysToFill > 0 && Array.from({ length: daysToFill }).map((_, i) => {
                    return (
                        <div key={i} className="text-zinc-900 w-10 h-10 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"/>
                    )
                })}
            </div>
        </div>
    )
}