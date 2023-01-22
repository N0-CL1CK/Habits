import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView } from 'react-native';
import { DayHabit, FRAME_SIZE } from '../components/DayHabit';
import { Header } from '../components/Header';
import { generateDates } from '../utils/generate-dates';

export function Home() {
    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const summaryDates = generateDates();
    const summaryDatesSize = (7 * 13);
    const daysToFill = (summaryDatesSize - summaryDates.length);

    const { navigate } = useNavigation();

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
                    {summaryDates.map(date => (
                        <DayHabit
                            key={date.toISOString()}
                            onPress={() => navigate('habit', { date: date.toISOString() })}
                        />
                    ))}

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