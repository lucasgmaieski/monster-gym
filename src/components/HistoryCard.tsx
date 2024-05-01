import { Text, View } from "react-native";

export function HistoryCard() {
    return (
        <View className="flex-row w-full pl-6 px-5 py-4 mb-3 bg-gray-600 rounded-md items-center justify-between">
            <View className="flex-1 mr-5">
                <Text className="text-white text-md font-heading line-clamp-1 capitalize">
                    Costas
                </Text>
                <Text className="text-gray-100 text-lg line-clamp-1">
                    Puxada Frontal
                </Text>
            </View>
            <Text className="text-gray-300 text-md">
                18:50
            </Text>
        </View>
    );
}