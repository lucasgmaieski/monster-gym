import { Alert, ImageBackground, ScrollView, Text, View } from "react-native";
import LogoSvg from '@assets/logo.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { api } from '@services/api';
import { AppError } from "@utils/AppError";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'A confirmação da senha não confere.')
})

export function SignUp() {
    const { control, handleSubmit, formState: { errors} } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleSignUp({name, email, password}: FormDataProps) {
        try {
            const respose = await api.post('/users', {name, email, password});
            console.log(respose.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.';
            Alert.alert(title);
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
                        <Text className="text-gray-100 text-xl text-center font-heading mb-4">Crie sua conta</Text>

                        <Controller 
                            control={control}
                            name="name"
                            render={({ field: {onChange, value}}) => (
                                <Input
                                    placeholder="Nome"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />

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

                                />
                            )}
                        />

                        <Controller 
                            control={control}
                            name="password_confirm"
                            render={({ field: {onChange, value}}) => (
                                <Input
                                    placeholder="Confirme a Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.password_confirm?.message}
                                    onSubmitEditing={handleSubmit(handleSignUp)}
                                    returnKeyType="send"
                                />
                            )}
                        />

                        <Button 
                            title="Criar e acessar"
                            onPress={handleSubmit(handleSignUp)}
                        />
                    </View>

                    <View className="mt-12">
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