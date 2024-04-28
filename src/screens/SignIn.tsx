import { ImageBackground, ScrollView, Text, View } from "react-native";
import LogoSvg from '@assets/logo.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount() {
        navigation.navigate('signUp')
    }
    return (
        <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
            <View className="flex-1 w-full pb-16">
                <ImageBackground defaultSource={require('../assets/background.png')} source={require('../assets/background.png')} resizeMode="cover" className="flex-1 px-10" alt="Pessoas treinando">
                    <View className="items-center my-20">
                        <LogoSvg width={170} />
                        <Text className="text-gray-100 text-sm">
                            Treine sua mente e o seu corpo
                        </Text>
                    </View>
                    <View className="mb-5">
                        <Text className="text-gray-100 text-xl text-center font-heading mb-4">Acesse sua conta</Text>
                        <Input
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Input
                            placeholder="Senha"
                            secureTextEntry
                        />
                        <Button title="Acessar"/>
                    </View>
                    <View className="items-center mt-20">
                        <Text className="text-gray-100 text-md mb-3">
                            Ainda não tem acesso?
                        </Text>
                        <Button 
                            title="Criar conta" 
                            variant="outline"
                            onPress={handleNewAccount}
                        />
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    );
}