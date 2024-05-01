import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { useState } from "react";
import { SectionList, Text, View } from "react-native";

export function History() {
    const [exercises, setExercises] = useState([
        {
            title: '26.08.24',
            data: ['Puxada frontal', 'Remada unilateral'],
        },
        {
            title: '27.08.24',
            data: ['Puxada frontal'],
        },
    ]);

    return(
        <View className="flex-1 w-full">
            <ScreenHeader title="Histórico de Exercícios"/>

            <SectionList 
                sections={exercises}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <HistoryCard />
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