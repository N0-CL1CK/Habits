import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import clsx from "clsx";
import dayjs from "dayjs";
import { generatePercentage } from "../utils/generate-percentage";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const MARGIN_BETWEEN_FRAMES = 8;
export const FRAME_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface DayHabitProps extends TouchableOpacityProps {
    amount?: number;
    completed?: number;
    date: Date;
}

export function DayHabit({ amount=0, completed=0, date, ...rest }: DayHabitProps) {
    const progressPercentage = generatePercentage(amount, completed);
    const isToday = dayjs(new Date()).startOf('day').isSame(date);

    return (
        <TouchableOpacity
            className={clsx('rounded-lg border-2 m-1', {
                ['bg-zinc-900 border-zinc-800']: progressPercentage === 0,
                ['bg-violet-100 border-violet-600']: progressPercentage > 0 && progressPercentage < 20,
                ['bg-violet-300 border-violet-600']: progressPercentage >= 20 && progressPercentage < 40,
                ['bg-violet-500 border-violet-600']: progressPercentage >= 40 && progressPercentage < 60,
                ['bg-violet-700 border-violet-600']: progressPercentage >= 60 && progressPercentage < 80,
                ['bg-violet-900 border-violet-600']: progressPercentage >= 80,
                ['border-white']: isToday
            })}
            style={{ width: FRAME_SIZE, height: FRAME_SIZE }}
            activeOpacity={0.4}
            {...rest}
        />
    )
}