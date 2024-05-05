import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@styles/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
    exerciseId : string;
}

export function Exercise() {
    const [sendingRegister, setSendingRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    const route = useRoute();

    const { exerciseId } = route.params as RouteParamsProps;

    function handleGoBack() {
        navigation.goBack();
    }

    async function fetchExerciseDetails() {
        try {
            setIsLoading(true);
            const response = await api.get(`/exercises/${exerciseId}`);
            setExercise(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício.';
            Alert.alert(title);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleExerciseHistoryRegister() {
        try {
            setSendingRegister(true);

            await api.post('/history', {exercise_id: exerciseId});
            Alert.alert('Parabéns! Exercício registrado no seu histórico.');
            navigation.navigate('history');
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível registrar o exercício.';
            Alert.alert(title);
        } finally {
            setSendingRegister(false);
        }
    }

    useEffect(()=> {
        fetchExerciseDetails();
    }, [exerciseId]);

    return(
        <View className="flex-1 w-full">
            <View className="bg-gray-600 pt-12 px-8">
                <TouchableOpacity onPress={handleGoBack}>
                    <Feather name="arrow-left" color={colors.green[500]} size={24}/>
                </TouchableOpacity>
                <View className="flex-row justify-between items-center mt-4 mb-8">
                    <Text className="text-gray-100 text-lg font-heading shrink">{exercise.name}</Text>
                    <View className="flex-row items-center">
                        <BodySvg />
                        <Text className="text-gray-200 ml-1 capitalize">
                            {exercise.group}
                        </Text>
                    </View>
                </View>
            </View>
            { isLoading ? 
                <Loading />
            :
                <ScrollView>
                    <View className="p-8">
                        <View className="mb-3 rounded-lg overflow-hidden">
                            <Image
                                width={100}
                                height={80}
                                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`}}
                                alt="Nome do exercício"
                                resizeMode="cover"
                                className="w-full h-60 rounded-lg"
                            />
                        </View>
                        <View className="bg-gray-600 rounded-md pb-4 px-4">
                            <View className="flex-row items-center justify-around mb-6 mt-5">
                                <View className="flex-row">
                                    <SeriesSvg />
                                    <Text className="text-gray-200 ml-2">
                                        {exercise.series} séries
                                    </Text>
                                </View>
                                <View className="flex-row">
                                    <RepetitionsSvg />
                                    <Text className="text-gray-200 ml-2">
                                        {exercise.repetitions} repetições
                                    </Text>
                                </View>
                            </View>
                            <Button 
                                title="Marcar como realizado"
                                isLoading={sendingRegister}
                                disabled={sendingRegister}
                                onPress={handleExerciseHistoryRegister}
                            />
                        </View>
                    </View>
                </ScrollView>
            }
        </View>
    );
}