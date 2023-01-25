import * as Popover from '@radix-ui/react-popover';
import dayjs from 'dayjs';
import clsx from 'clsx';

import { ProgressBar } from './ProgressBar';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface dayHabitsProps {
    date: Date
    amount?: number
    defaultCompleted?: number
}

export function DayHabits({ defaultCompleted = 0, amount = 0, date }: dayHabitsProps) {
    const [completed, setCompleted] = useState(defaultCompleted);
    const completedPercentual = amount > 0 ? Math.round((completed/amount)*100) : 0;
    const dayAndMonth = dayjs(date).format('DD/MM');
    const weekDay = dayjs(date).format('dddd');

    function handleCompletedChanged(completed: number) { setCompleted(completed) }

    const isToday = dayjs(new Date()).startOf('day').isSame(date);

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx('w-9 h-9 border-2 rounded-lg transition-colors duration-300', {
                ['bg-zinc-900 border-zinc-800']: completedPercentual === 0,
                ['bg-violet-100 border-violet-600']: completedPercentual > 0 && completedPercentual < 20,
                ['bg-violet-300 border-violet-600']: completedPercentual >= 20 && completedPercentual < 40,
                ['bg-violet-500 border-violet-600']: completedPercentual >= 40 && completedPercentual < 60,
                ['bg-violet-700 border-violet-600']: completedPercentual >= 60 && completedPercentual < 80,
                ['bg-violet-900 border-violet-600']: completedPercentual >= 80,
                ['ring-white ring-2 ring-offset-2 ring-offset-background']: isToday
            })} />
            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <span className='font-semibold text-zinc-400'>{weekDay}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>
                    <ProgressBar progress={completedPercentual} />
                    <HabitsList
                        date={date}
                        onCompletedChanged={handleCompletedChanged}
                    />
                    <Popover.Arrow height={10} width={20} className='fill-zinc-900' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}