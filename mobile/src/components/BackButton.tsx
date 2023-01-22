import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

export function BackButton() {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={useNavigation().goBack}
        >
            <Feather
                name="arrow-left"
                size={32}
                color={colors.zinc[400]}
            />
        </TouchableOpacity>
    );
}