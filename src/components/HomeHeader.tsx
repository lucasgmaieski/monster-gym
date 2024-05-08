import { Text, TouchableOpacity, View } from "react-native";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@styles/theme";
import { useAuth } from "@hooks/useAuth";
import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { api } from "@services/api";

export function HomeHeader() {
    const { user, signOut } = useAuth();

    return (
        <View className="bg-gray-600 pt-16 pb-5 px-8 items-center flex-row">
            <UserPhoto 
                size={64} 
                source={ 
                    user.avatar 
                    ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}`}
                    : defaultUserPhotoImg}
                alt="Imagem do usuário"
            />
            <View className="ml-4 flex-1">
                <Text className="text-gray-100 text-md">Olá,</Text>
                <Text className="text-gray-100 text-md font-heading">{user.name}</Text>
            </View>

            <TouchableOpacity onPress={signOut}>
                <MaterialIcons name="logout" color={colors.gray[300]} size={35}/>
            </TouchableOpacity>
        </View>
    );
}