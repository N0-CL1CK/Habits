import { View, Text, ScrollView, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { DayHabit, FRAME_SIZE } from '../components/DayHabit';
import { generateDates } from '../utils/generate-dates';
import { Loading } from '../components/Loading';
import { Header } from '../components/Header';
import { api } from '../lib/axios';

import dayjs from 'dayjs';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDates();
const summaryDatesSize = (7 * 13);
const daysToFill = (summaryDatesSize - summaryDates.length);

type summaryProps = Array<{
    id: string;
    date: string;
    amount: number;
    completed: number;
}>

export function Home() {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<summaryProps>([]);

    async function fetchData() {
        try {
            setLoading(true);
            const response = await api.get('/summary');
            setSummary(response.data);
        } catch(err) {
            Alert.alert('Ops', 'Não foi possível carregar o sumário!');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchData();
    }, []));
    
    if (loading) return (<Loading />);

    return (
        <View className='flex-1 bg-background px-8 pt-24'>
            <Header />

            <View className='flex-row mt-6 mb-2'>
                {weekDays.map((weekDay, i) => (
                    <Text
                        key={`${weekDay}-${i}`}
                        className='text-zinc-400 text-xl font-bold text-center m-1'
                        style={{ width: FRAME_SIZE }}
                    >
                        {weekDay}
                    </Text>
                ))}
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View className='flex-row flex-wrap'>
                    {summaryDates.map(date => {
                        const dayWithHabits = summary.find(day => dayjs(date).isSame(day.date, 'day'));

                        return (
                            <DayHabit
                                key={date.toISOString()}
                                date={date}
                                amount={dayWithHabits?.amount}
                                completed={dayWithHabits?.completed}
                                onPress={() => navigate('habit', { date: date.toISOString() })}
                            />
                        );
                    })}

                    {daysToFill > 0 && Array
                        .from({ length: daysToFill })
                        .map((_, i) => (
                            <View
                                key={i}
                                className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                                style={{ width: FRAME_SIZE, height: FRAME_SIZE }}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}