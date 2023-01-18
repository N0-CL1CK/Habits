interface HabitPrototype {
    completed: number
}

export function Habit(prototype: HabitPrototype) {
    return (
        <div className="bg-zinc-900 w-8 text-white rounded m-2 flex items-center justify-center">
            {prototype.completed}
        </div>
    )
}