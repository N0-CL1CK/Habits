import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

export function NewHabitForm() {
    const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<number[]>([]);

    async function createNewHabit(event: FormEvent) {
        event.preventDefault();

        if (!title || weekDays.length === 0) return;

        await api.post('/habits', { title, weekDays });
        setTitle('');
        setWeekDays([]);
        alert('Hábito criado com sucesso!');
    }

    function handleToggleWeekDay(weekDay: number) {
        (weekDays.includes(weekDay))
            ? setWeekDays(weekDays.filter(day => day !== weekDay))
            : setWeekDays([...weekDays, weekDay]);
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6" >
            <label htmlFor="title" className="font-semibold leading-tight"> Qual seu comprometimento? </label>
            <input
                id="title"
                type="text"
                placeholder="Ex.: Exercícios, Dormir bem, etc."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <label htmlFor="" className="font-semibold leading-tight mt-4"> Qual a recorrência? </label>
            <div className='flex flex-col gap-2 mt-3'>
            {availableWeekDays.map((weekDay, index) => (
                <Checkbox.Root
                    key={weekDay}
                    className='flex items-center gap-3 group'
                    checked = {weekDays.includes(index)}
                    onCheckedChange={() => handleToggleWeekDay(index)}
                >
                    <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-violet-500 group-data-[state=checked]:border-violet-500 transition-colors duration-300'>
                        <Checkbox.Indicator>
                            <Check
                                size={20}
                                className='text-white'
                            />
                        </Checkbox.Indicator>
                    </div>
                    <span className='text-white leading-tight'>
                        {weekDay}
                    </span>
                </Checkbox.Root>
            ))}
            </div>
            <button
                type="submit"
                className="mt-6 p-4 rounded-lg flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-700 transition-colors duration-300"
            >
                <Check size={24} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}