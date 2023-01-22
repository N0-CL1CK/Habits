import { Check } from "phosphor-react";

export function NewHabitForm() {
    return (
        <form className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight"> Qual seu comprometimento? </label>
            <input
                id="title"
                type="text"
                placeholder="Ex.: Exercícios, Dormir bem, etc."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                autoFocus
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4"> Qual a recorrência? </label>
            <button type="submit" className="mt-6 p-4 rounded-lg flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-700">
                <Check size={24} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}