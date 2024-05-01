import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";

export function Home() {
    const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'Ombro']);
    const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada ', 'Remada baixa', 'Remada alta']);
    const [groupSelected, setGroupSelected] = useState('Costas');

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenExercisesDetails() {
        navigation.navigate('exercise')
    }

    return(
        <View className="flex-1 w-full">
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item =>item}
                renderItem={({item}) => (
                    <Group 
                        name={item}
                        isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-10 my-10 max-h-10 min-h-10"
            />

            <View className="flex-1 px-8">
                <View className="flex-row justify-between mb-5">
                    <Text className="text-gray-200 text-md font-heading">Exercícios</Text>
                    <Text className="text-gray-200 text-sm">{exercises.length}</Text>
                </View>

                <FlatList 
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <ExerciseCard 
                            onPress={handleOpenExercisesDetails}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20}}
                />
            </View>

        </View>
    );
}