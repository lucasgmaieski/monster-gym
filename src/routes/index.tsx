import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { View } from "react-native";
import { colors } from "@styles/theme";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";
import { useEffect, useState } from "react";
import { NotificationWillDisplayEvent, OSNotification, OneSignal } from "react-native-onesignal";
import { Notification } from "@components/Notification";

export function Routes() {
    const [notification, setNotification] = useState<OSNotification>()
    const { user, isLoadingUserStorageData } = useAuth();

    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    useEffect(() => {
        const handleNotification = (event: NotificationWillDisplayEvent): void => {
            event.preventDefault()
            const response = event.getNotification();
            console.log(response);
            setNotification(response);
        }

        OneSignal.Notifications.addEventListener(
            "foregroundWillDisplay",
            handleNotification
        )

        return () => OneSignal.Notifications.removeEventListener("foregroundWillDisplay", handleNotification)
    }, [])

    if(isLoadingUserStorageData) {
        return <Loading />
    }
    return (
        <View className="flex-1 w-full bg-gray-700">
            <NavigationContainer theme={theme}>
                {user.id ? 
                <>
                    <AppRoutes /> 
                    {notification?.title && 
                        <Notification  data={notification} onClose={() => setNotification(undefined)}/>
                    }
                </>
                : 
                <AuthRoutes />
                }
            </NavigationContainer>
        </View>
    );
}