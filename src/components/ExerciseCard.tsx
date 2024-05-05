import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { colors } from "@styles/theme";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

type Props = TouchableOpacityProps & {
    data: ExerciseDTO;
};

export function ExerciseCard({data, ...rest}: Props) {
    return (
        <TouchableOpacity {...rest}>
            <View className="flex-row bg-gray-500 items-center p-2 pr-4 rounded-md mb-3">
                <Image 
                    source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}}
                    alt="Imagem do exercício"
                    width={64}
                    height={64}
                    className="rounded-md mr-4"
                    resizeMode="cover"
                />
                <View className="flex-1">
                    <Text className="text-md text-white font-heading">
                        {data.name}
                    </Text>
                    <Text className="text-sm text-gray-200 mt-1 line-clamp-2">
                        {data.series} séries x {data.repetitions} repetições
                    </Text>
                </View>
                <View>
                    <Entypo name="chevron-thin-right" color={colors.gray[300]} size={18}/>
                </View>
            </View>
        </TouchableOpacity>
    );
}