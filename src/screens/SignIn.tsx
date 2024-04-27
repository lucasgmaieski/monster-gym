import { ImageBackground, ScrollView, Text, View } from "react-native";
import LogoSvg from '@assets/logo.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
    return (
        <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
            <View className="flex-1 w-full bg-gray-700 pb-16">
                <ImageBackground source={require('../assets/background.png')} resizeMode="cover" className="flex-1 px-10" alt="Pessoas treinando">
                    <View className="items-center my-24">
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
                        <Button title="Criar conta" variant="outline"/>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    );
}