import { View } from 'react-native';

interface ProgressBarProps {
    progress?: number;
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {
    return (
        <View className='w-full h-3 mt-4 bg-zinc-700 rounded-lg'>
            <View
                className='h-3 rounded-lg bg-violet-600'
                style={{ width: `${progress}%` }}
            />
        </View>
    );
}