import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { HabitsEmpty } from './HabitsEmpty';

interface HabitsListProps {
    date: Date;
    onCompletedChanged: (completed: number) => void;
}

type habitsInfoProps = {
    possibleHabits: Array<{ id:string; title:string; created_at:string; }>;
    completedHabits: Array<string>;
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
    const [habitsInfo, setHabitsInfo] = useState<habitsInfoProps>();

    useEffect(() => {
        api.get('day', { params: { date: date.toISOString() } })
            .then(response => setHabitsInfo(response.data))
            .catch(reject => console.error(reject));
    }, []);

    async function handleToggleHabit(id: string) {
        await api.patch(`/habits/${id}/toggle`);

        const isHabitAlreadyCompleted = habitsInfo?.completedHabits.includes(id);

        let completedHabits: Array<string> = [];

        (isHabitAlreadyCompleted)
            ? completedHabits = habitsInfo!.completedHabits.filter(idHabit => idHabit !== id)
            : completedHabits = [...habitsInfo!.completedHabits, id];    
    
        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits
        });

        onCompletedChanged(completedHabits.length);
    }

    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

    return (
        <div className='mt-6 flex flex-col gap-3'>
            { habitsInfo?.possibleHabits
                ? habitsInfo?.possibleHabits.map(habit => (
                    <Checkbox.Root 
                        key={habit.id} 
                        disabled={isDateInPast}
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        className='flex items-center gap-3 group'
                        defaultChecked={habitsInfo.completedHabits.includes(habit.id)}
                    >
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors duration-300'>
                            <Checkbox.Indicator>
                                <Check
                                    size={20}
                                    className='text-white'
                                />
                            </Checkbox.Indicator>
                        </div>
                        <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-white/70'>
                            {habit.title}
                        </span>
                    </Checkbox.Root> ))
                : <HabitsEmpty />
            }
        </div>
    );
}