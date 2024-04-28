import { ImageBackground, ScrollView, Text, View } from "react-native";
import LogoSvg from '@assets/logo.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignUp() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
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
                        <Text className="text-gray-100 text-xl text-center font-heading mb-4">Crie sua conta</Text>
                        <Input
                            placeholder="Nome"
                        />
                        <Input
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Input
                            placeholder="Senha"
                            secureTextEntry
                        />
                        <Button title="Criar e acessar"/>
                    </View>

                    <View className="mt-16">
                        <Button 
                            title="Voltar para o login" 
                            variant="outline"
                            onPress={handleGoBack}
                        />
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    );
}