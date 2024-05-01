import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { colors } from "@styles/theme";

type Props = TouchableOpacityProps & {

};

export function ExerciseCard({...rest}: Props) {
    return (
        <TouchableOpacity {...rest}>
            <View className="flex-row bg-gray-500 items-center p-2 pr-4 rounded-md mb-3">
                <Image 
                    source={{ uri: 'https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-2.jpg'}}
                    alt="Imagem do exercício"
                    width={64}
                    height={64}
                    className="rounded-md mr-4"
                    resizeMode="cover"
                />
                <View className="flex-1">
                    <Text className="text-md text-white font-heading">
                        Remada Unilateral
                    </Text>
                    <Text className="text-sm text-gray-200 mt-1 line-clamp-2">
                        3 séries x 12 repetições lore
                    </Text>
                </View>
                <View>
                    <Entypo name="chevron-thin-right" color={colors.gray[300]} size={18}/>
                </View>
            </View>
        </TouchableOpacity>
    );
}