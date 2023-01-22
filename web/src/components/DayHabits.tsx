import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';

interface dayHabitsProps {
    completed: number
    amount: number
}

export function DayHabits({ completed, amount }: dayHabitsProps) {
    const completedPercentual = Math.round((completed/amount)*100);

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx("text-zinc-900 w-10 h-10 border-2 border-zinc-800 rounded-lg", {
                'bg-zinc-900 border-zinc-800': completedPercentual === 0,
                'bg-violet-900 border-violet-700': completedPercentual > 0 && completedPercentual < 20,
                'bg-violet-800 border-violet-600': completedPercentual >= 20 && completedPercentual < 40,
                'bg-violet-700 border-violet-500': completedPercentual >= 40 && completedPercentual < 60,
                'bg-violet-600 border-violet-400': completedPercentual >= 60 && completedPercentual < 80,
                'bg-violet-500 border-violet-300': completedPercentual >= 80
            })} />
            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">Domingo</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">22/01</span>
                    <ProgressBar progress={50} />
                    <Popover.Arrow height={10} width={20} className="fill-zinc-900" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}