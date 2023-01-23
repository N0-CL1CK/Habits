import { ScrollView, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { ProgressBar } from '../components/ProgressBar';
import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';

import dayjs from 'dayjs';

interface HabitProps {
    date: string;
}

export function Habit() {
    const route = useRoute();
    const { date } = route.params as HabitProps;
    
    const parsedDate = dayjs(date);
    const weekDay = parsedDate.format('dddd');
    const dayAndMonth = parsedDate.format('DD/MM');

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
                <ProgressBar progress={70}/>
                <View className='mt-6'>
                    <Checkbox
                        title='Beber 2L de água'
                        checked
                    />
                    <Checkbox
                        title='Regular o sono'
                        
                    />
                </View>
            </ScrollView>
        </View>
    )
}