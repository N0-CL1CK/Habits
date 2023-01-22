import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const MARGIN_BETWEEN_FRAMES = 8;
export const FRAME_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface DayHabitProps extends TouchableOpacityProps {}

export function DayHabit({ ...rest }: DayHabitProps) {
    return (
        <TouchableOpacity
            className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
            style={{ width: FRAME_SIZE, height: FRAME_SIZE }}
            activeOpacity={0.4}
            {...rest}
        />
    )
}