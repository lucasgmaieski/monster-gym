import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { Text, View } from "react-native";
import { colors } from "@styles/theme";

export function Routes() {
    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];
    return (
        <View className="flex-1 w-full bg-gray-700">
            <NavigationContainer theme={theme}>
                <AppRoutes />
            </NavigationContainer>
        </View>
    );
}