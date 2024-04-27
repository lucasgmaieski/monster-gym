import { ActivityIndicator, View } from "react-native";

export function Loading() {
    return (
        <View className="flex-1 items-center justify-center bg-gray-700 w-full">
            <ActivityIndicator className="color-green-500" />
        </View>
    )
}