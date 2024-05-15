import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from '@styles/theme';
import { OSNotification } from 'react-native-onesignal';
import { useNavigation } from '@react-navigation/native';

type Props = {
  data: OSNotification;
  onClose: () => void;
}
type additionalDataProps = {
    route?: string;
    excercise_id?: string;
}
export function Notification({ data, onClose }: Props) {
    const { navigate } = useNavigation();
    function handleOnPress() {
        const { route, excercise_id } = data.additionalData as additionalDataProps
    }

    return (
        <Pressable className='w-full p-4 pt-12 bg-gray-200 absolute top-0' onPress={handleOnPress}>
            <View className='flex-row justify-between items-center'>
                <View className='mr-2'>
                        <Ionicons name="notifications-outline" className='text-black' size={25}/>
                    </View>
                <Text className="text-md text-black flex-1">
                {data.title}
                </Text>
            <TouchableOpacity onPress={onClose} className=''>
                    <Ionicons name="close-sharp" className='text-black' size={25}/>
                </TouchableOpacity>
            </View>
        </Pressable>
    );
}