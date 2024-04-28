import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";

export function Home() {
    const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'Ombro'])
    const [groupSelected, setGroupSelected] = useState('costas');

    return(
        <View className="flex-1 w-full">
            <HomeHeader />

            <FlatList 
                data={groups}
                keyExtractor={item =>item}
                renderItem={({item}) => (
                    <Group 
                        name={item}
                        isActive={groupSelected === item}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-10 my-10 max-h-10"
            />

            <View className="flex-1 px-8">
                <View className="flex-row justify-between mb-5">
                    <Text className="text-gray-200 text-md font-heading">Exercícios</Text>
                    <Text className="text-gray-200 text-sm">4</Text>
                </View>
            </View>
        </View>
    );
}