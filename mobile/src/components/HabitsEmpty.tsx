import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

export function HabitsEmpty() {
    const { navigate } = useNavigation();

    return (
        <Text className='text-zinc-400 text-base text-center'>
            Você ainda não possui nenhum hábito neste dia! Experimente criar um novo clicando{' '}
            <Text
                className='text-violet-400 text-base underline active:text-violet-500'
                onPress={() => navigate('new')}
            >
                aqui
            </Text>
        </Text>
    );
}