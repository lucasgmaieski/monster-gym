import {  Text, View, StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import "./src/styles/global.css";
import { Loading } from '@components/Loading';

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

    return (
        
        <View className="flex-1 bg-black justify-center items-center">
            <StatusBar 
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            {fontsLoaded ? <Text className='text-blue-500 font-heading'>Hello Monster</Text> : <Loading />}
        </View>
    );
}