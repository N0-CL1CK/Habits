import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface ProgressBarProps {
    progress?: number;
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {
    const sharedProgress = useSharedValue(progress);
    const animatedStyle = useAnimatedStyle(() => {return {
        width: `${sharedProgress.value}%`
    }});

    useEffect(() => {
        sharedProgress.value = withTiming(progress, { duration: 500 });
    }, [progress]);

    return (
        <View className='w-full h-3 mt-4 bg-zinc-700 rounded-lg'>
            <Animated.View
                className='h-3 rounded-lg bg-violet-600'
                style={animatedStyle}
            />
        </View>
    );
}