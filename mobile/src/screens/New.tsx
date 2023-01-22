import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import colors from 'tailwindcss/colors';

export function New() {
    const availableWeekDays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

    const [weekDays, setWeekDays] = useState<number[]>([]);

    function handleToggleWeekDay(weekDayIndex: number) {
        weekDays.includes(weekDayIndex)
            ? setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
            : setWeekDays(prevState => [...prevState, weekDayIndex]);
        
    }

    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 370 }}
            >
                <BackButton />
                <Text className='mt-6 text-white font-extrabold text-3xl'>
                    Criar hábito
                </Text>
                <Text className='mt-6 text-white font-semibold text-base'>
                    Qual seu comprometimento?
                </Text>
                <TextInput
                    className='h-12 pl-4 rounded-lg mt-3 bg-zinc-900 border-zinc-800 text-white border-2 focus:border-violet-500'
                    placeholder='Ex.: Exercícios, Dormir bem, etc'
                    placeholderTextColor={colors.zinc[500]}
                />
                <Text className='font-semibold mt-4 mb-3 text-base text-white'>
                    Qual a recorrência?
                </Text>
                { availableWeekDays.map((weekDay, index) => (
                    <Checkbox 
                        key={weekDay}
                        title={weekDay}
                        checked={weekDays.includes(index)}
                        onPress={() => handleToggleWeekDay(index)}
                    />
                ))}
                <TouchableOpacity
                    className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-lg mt-6'
                    activeOpacity={0.7}
                >
                    <Feather
                        name='check'
                        size={20}
                        color={colors.white}
                    />
                    <Text className='font-semibold text-base text-white ml-2'>
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}