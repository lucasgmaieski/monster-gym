import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from '@styles/theme';
import { OSNotification } from 'react-native-onesignal';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import * as Linking from 'expo-linking';

type Props = {
  data: OSNotification;
  onClose: () => void;
}
type additionalDataProps = {
    route?: string;
    excercise_id?: string;
}
type CustomOSNotification = {
    custom: any
    u: string
  }
export function Notification({ data, onClose }: Props) {
    const { navigate } = useNavigation<AppNavigatorRoutesProps>();
    function handleOnPress() {
        if(data.additionalData) {
            const { route, excercise_id } = data.additionalData as additionalDataProps
            console.log(route, excercise_id);
            if(route === 'exercise' && excercise_id) {
                navigate("exercise", {exerciseId: excercise_id})
                onClose();
            }
        } else {
            const { custom }: CustomOSNotification = JSON.parse(
                data.rawPayload.toString(),
              )
              const { u: uri }: CustomOSNotification = JSON.parse(custom.toString())
            if(uri) {
                Linking.openURL(uri);
                onClose();
            }
        }
    }

    return (
        <Pressable className='w-full p-4 pt-12 bg-gray-200 absolute top-0' onPress={handleOnPress}>
            <View className='flex-row justify-between items-center'>
                <View className='mr-2'>
                    <Ionicons name="notifications-outline" className='text-black' size={25}/>
                </View>
                <View className='flex-1'>
                    <Text className="text-md text-black">
                        {data.title}
                    </Text>
                    <Text className="text-md text-black">
                        {data.body}
                    </Text>
                </View>
                <TouchableOpacity onPress={onClose} className=''>
                    <Ionicons name="close-sharp" className='text-black' size={25}/>
                </TouchableOpacity>
            </View>
        </Pressable>
    );
}