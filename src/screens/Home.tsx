import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";

export function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState<string[]>([]);
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [groupSelected, setGroupSelected] = useState('antebraço');

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenExercisesDetails(exerciseId: string) {
        navigation.navigate('exercise', {exerciseId});
    }

    async function fetchGroups() {
        try {
            const response = await api.get('/groups');
            setGroups(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi pissível carregar os grupos musculares.';
            Alert.alert(title);
        }
    }

    async function fetchExercisesByGroup() {
        try {
            setIsLoading(true);

            const response = await api.get(`/exercises/bygroup/${groupSelected}`);
            setExercises(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi pissível carregar os exercícios.';
            Alert.alert(title);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchGroups();
    }, []);

    useFocusEffect(useCallback(() => {
        fetchExercisesByGroup();
    }, [groupSelected]));

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

            {
                isLoading ? <Loading /> :
                <View className="flex-1 px-8">
                    <View className="flex-row justify-between mb-5">
                        <Text className="text-gray-200 text-md font-heading">Exercícios</Text>
                        <Text className="text-gray-200 text-sm">{exercises.length}</Text>
                    </View>

                    <FlatList 
                        data={exercises}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <ExerciseCard 
                                onPress={() => handleOpenExercisesDetails(item.id)}
                                data={item}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20}}
                    />
                </View>
            }

        </View>
    );
}