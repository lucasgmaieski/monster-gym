import { View, StatusBar, Text } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import "./src/styles/global.css";
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
import { SignIn } from '@screens/SignIn';
import { AuthContext, AuthContextProvider } from '@contexts/AuthContext';
import { OneSignal } from 'react-native-onesignal'
import { tagUserEmailCreate } from '@notifications/notificationsTags';


OneSignal.initialize("d003277e-a8f8-4a1d-9cd8-74b32038af6c")
OneSignal.Notifications.requestPermission(true)

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

    tagUserEmailCreate("lucasgrigol@gmail.com")

    return (
        
        <View className="flex-1 bg-black justify-center items-center">
            <StatusBar 
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <AuthContextProvider>
                {fontsLoaded ? <Routes /> : <Loading />}
            </AuthContextProvider>
        </View>
    );
}