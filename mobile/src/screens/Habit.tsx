import { ScrollView, View, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { ProgressBar } from '../components/ProgressBar';
import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { api } from '../lib/axios';
import { generatePercentage } from '../utils/generate-percentage';
import { HabitsEmpty } from '../components/HabitsEmpty';
import clsx from 'clsx';

interface HabitProps {
    date: string;
}

type habitsInfoProps = {
    possibleHabits: Array<{ id: string; title: string; created_at: string; }>
    completedHabits: string[];
}

export function Habit() {
    const [loading, setLoading] = useState(true);
    const [habitsInfo, setHabitsInfo] = useState<habitsInfoProps>();

    const route = useRoute();
    const { date } = route.params as HabitProps;
    
    const parsedDate = dayjs(date);
    const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
    const weekDay = parsedDate.format('dddd');
    const dayAndMonth = parsedDate.format('DD/MM');

    const habitsProgress = habitsInfo?.possibleHabits.length
        ? generatePercentage(habitsInfo.possibleHabits.length, habitsInfo.completedHabits.length)
        : 0;

    async function handleToggleHabit(id: string) {
        try {
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
        } catch (error) {
            console.error(error);
            Alert.alert('Ops', 'Não foi possível atualizar o status!');
        }
    }

    async function fetchHabits() {
        try {
            const response = await api.get('/day', { params: { date } });
            setHabitsInfo(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Ops', 'Não foi possível carregar as informações!')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchHabits() }, []);

    if (loading) return <Loading />

    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />
                <Text className='mt-6 text-zinc-500 font-semibold text-base lowercase'>
                    {weekDay}
                </Text>
                <Text className='text-white font-extrabold text-3xl'>
                    {dayAndMonth}
                </Text>
                <ProgressBar progress={habitsProgress}/>
                <View className={clsx('mt-6', {
                    ['opacity-50']: isDateInPast
                })}>
                    {habitsInfo?.possibleHabits.length
                        ? habitsInfo.possibleHabits.map(habits => (
                            <Checkbox
                                key={habits.id}
                                title={habits.title}
                                checked={habitsInfo.completedHabits.includes(habits.id)}
                                disabled={isDateInPast}
                                onPress={() => handleToggleHabit(habits.id)}
                            /> ))
                        : <HabitsEmpty />
                    }
                </View>
            </ScrollView>
        </View>
    )
}