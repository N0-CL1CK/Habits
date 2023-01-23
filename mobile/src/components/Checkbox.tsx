import { Text, TouchableOpacity, View, TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

interface CheckboxProps extends TouchableOpacityProps {
    title: string;
    checked?: boolean
}

function isChecked(chk: boolean) {
    if (chk) {
        return (
            <View className='h-8 w-8 bg-violet-500 rounded-lg items-center justify-center'>
                <Feather 
                    name='check'
                    size={20}
                    color={colors.white}
                />
            </View>
        );
    } else return (<View className='h-8 w-8 bg-zinc-800 rounded-lg' />);
}

export function Checkbox({ title, checked = false, ...rest }: CheckboxProps) {
    
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className='flex-row items-center mb-2'
            {...rest}
        >
            {isChecked(checked)}
            <Text className='text-white text-base ml-3 font-semibold'>
                {title}
            </Text>
        </TouchableOpacity>
    );
}