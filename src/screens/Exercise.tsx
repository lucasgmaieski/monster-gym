import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@styles/theme";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";

export function Exercise() {
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleGoBack() {
        navigation.goBack();
    }
    return(
        <View className="flex-1 w-full">
            <View className="bg-gray-600 pt-12 px-8">
                <TouchableOpacity onPress={handleGoBack}>
                    <Feather name="arrow-left" color={colors.green[500]} size={24}/>
                </TouchableOpacity>
                <View className="flex-row justify-between items-center mt-4 mb-8">
                    <Text className="text-gray-100 text-lg font-heading shrink">Puxada Frontal</Text>
                    <View className="flex-row items-center">
                        <BodySvg />
                        <Text className="text-gray-200 ml-1 capitalize">
                            Costas
                        </Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View className="p-8">
                    <Image
                        width={100}
                        height={80}
                        source={{ uri: 'https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-2.jpg'}}
                        alt="Nome do exercício"
                        resizeMode="cover"
                        className="mb-3 w-full h-60 rounded-lg"
                    />
                    <View className="bg-gray-600 rounded-md pb-4 px-4">
                        <View className="flex-row items-center justify-around mb-6 mt-5">
                            <View className="flex-row">
                                <SeriesSvg />
                                <Text className="text-gray-200 ml-2">
                                    3 séries
                                </Text>
                            </View>
                            <View className="flex-row">
                                <RepetitionsSvg />
                                <Text className="text-gray-200 ml-2">
                                    12 repetições
                                </Text>
                            </View>
                        </View>
                        <Button title="Marcar como realizado"/>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}