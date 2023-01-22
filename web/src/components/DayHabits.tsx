import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';

interface dayHabitsProps {
    date: Date
    amount?: number
    completed?: number
}

export function DayHabits({ completed = 0, amount = 0, date }: dayHabitsProps) {
    const completedPercentual = amount > 0 ? Math.round((completed/amount)*100) : 0;
    const dayAndMonth = dayjs(date).format('DD/MM');
    const weekDay = dayjs(date).format('dddd');

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx('text-zinc-900 w-10 h-10 border-2 border-zinc-800 rounded-lg', {
                'bg-zinc-900 border-zinc-800': completedPercentual === 0,
                'bg-violet-900 border-violet-700': completedPercentual > 0 && completedPercentual < 20,
                'bg-violet-800 border-violet-600': completedPercentual >= 20 && completedPercentual < 40,
                'bg-violet-700 border-violet-500': completedPercentual >= 40 && completedPercentual < 60,
                'bg-violet-600 border-violet-400': completedPercentual >= 60 && completedPercentual < 80,
                'bg-violet-500 border-violet-300': completedPercentual >= 80
            })} />
            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <span className='font-semibold text-zinc-400'>{weekDay}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>
                    <ProgressBar progress={50} />
                    <div className='mt-6 flex flex-col gap-3'>
                        <Checkbox.Root className='flex items-center gap-3 group'>
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                                <Checkbox.Indicator>
                                    <Check
                                        size={20}
                                        className='text-white'
                                    />
                                </Checkbox.Indicator>
                            </div>
                            <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-white/70'>
                                Beber 2 litros de água
                            </span>
                        </Checkbox.Root>
                    </div>
                    <Popover.Arrow height={10} width={20} className='fill-zinc-900' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}