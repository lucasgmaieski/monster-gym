import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { Alert, SectionList, Text, View } from "react-native";

export function History() {
    const [isLoading, setIsLoading] = useState(true);
    const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

    async function fetchExerciseDetails() {
        try {
            setIsLoading(true);
            const response = await api.get('/history');
            setExercises(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar o histórico.';
            Alert.alert(title);
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchExerciseDetails();
    }, []));


    return(
        <View className="flex-1 w-full">
            <ScreenHeader title="Histórico de Exercícios"/>

            <SectionList 
                sections={exercises}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <HistoryCard data={item}/>
                )}
                renderSectionHeader={({ section }) => (
                    <Text className="text-gray-200 text-md font-heading mt-10 mb-3">{section.title}</Text>
                )}
                contentContainerStyle={[].length === 0 && { flex: 1, justifyContent: 'center'}}
                ListEmptyComponent={() => (
                    <Text className="text-gray-100 text-center"> Não há exercícios registrados ainda.{'\n'} Vamor fazer exercícios hoje?</Text>
                )}
                className="px-7"
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
}