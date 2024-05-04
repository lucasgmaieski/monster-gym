import { Alert, ImageBackground, ScrollView, Text, View } from "react-native";
import LogoSvg from '@assets/logo.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { useState } from "react";

type FormDataProps = {
    email: string;
    password: string;
}

const signUpSchema = yup.object({
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const { control, handleSubmit, formState: { errors} } = useForm<FormDataProps>({
        mode: "onBlur",
        resolver: yupResolver(signUpSchema)
    });

    const { signIn } = useAuth();

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount() {
        navigation.navigate('signUp')
    }

    async function handleSignIn({email, password}: FormDataProps) {
        try {
            setIsLoading(true);
            await signIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'
            Alert.alert(title);

            setIsLoading(false);
        }
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
                        <Controller 
                            control={control}
                            name="email"
                            render={({ field: {onChange, value}}) => (
                                <Input
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />
                        <Controller 
                            control={control}
                            name="password"
                            render={({ field: {onChange, value}}) => (
                                <Input
                                    placeholder="Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.password?.message}
                                    onSubmitEditing={handleSubmit(handleSignIn)}
                                    returnKeyType="send"
                                />
                            )}
                        />
                        <Button 
                            title="Acessar"
                            onPress={handleSubmit(handleSignIn)}
                            isLoading={isLoading}
                            disabled={isLoading}
                        />
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