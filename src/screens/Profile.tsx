import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type FormDataProps = yup.InferType<typeof profileSchema>

const profileSchema = yup.object({
name: yup.string().required('Informe o nome'),
password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos.').nullable().transform((value) => !!value ? value : null),
confirm_password: yup.string().nullable().transform((value) => !!value ? value : null).oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
.when('password', {
is: (Field: any) => Field,
then: (schema) => schema
.nullable()
.required('Informe a confirmação da senha.')
.transform((value) => !!value ? value : null)
})
}).shape({
    email: yup.string().nonNullable().required(),
    old_password: yup.string().nullable(),
});

export function Profile() {
    const [isUpdating, setIsUpdating] = useState(false);
    const [photoIsLoading, sePhotoIsLoading] = useState(false);
    const { user, updateUserProfile } = useAuth();
    const { control, handleSubmit, formState: { errors} } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email
        },
        resolver: yupResolver(profileSchema),
    });

    async function handleUserPhotoSelect() {
        sePhotoIsLoading(true);
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
                
            });
            console.log(photoSelected)
    
            if(photoSelected.canceled) return;
    
            if(photoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri, {size: true})

                if(photoInfo.exists && (photoInfo.size / 1024 / 1024 ) > 3) {
                    return Alert.alert("Essa imagem é muito grande. Escolha uma de até 5MB.");
                }

                // setUserPhoto(photoSelected.assets[0].uri)
                const fileExtension = photoSelected.assets[0].uri.split('.').pop();
                const photoFile = {
                    name: `${user.name.trim()}.${fileExtension}`.toLowerCase(),
                    uri: photoSelected.assets[0].uri,
                    type: `${photoSelected.assets[0].type}/${fileExtension}`
                } as any

                const userPhotoUploadForm = new FormData();
                userPhotoUploadForm.append('avatar', photoFile);

                const avatarUpdatedResponse =  await api.patch('/users/avatar', userPhotoUploadForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const userUpdated = user;
                userUpdated.avatar = avatarUpdatedResponse.data.avatar;
                updateUserProfile(userUpdated);

                Alert.alert('Foto atualizada!');

            }
        } catch (error) {
            console.log(error);
        } finally {
            sePhotoIsLoading(false);
        }
    }

    async function handleProfileUpdate(data: FormDataProps) {
        try {
            setIsUpdating(true);

            const userUpdated = user;
            userUpdated.name = data.name;

            api.put('/users', data)

            await updateUserProfile(userUpdated);

            Alert.alert('Perfil atualizado com sucesso!');
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';
            Alert.alert(title);
        } finally {
            setIsUpdating(false);
        }
    }

    return(
        <View className="flex-1 w-full ">
            <ScreenHeader title="Perfil"/>
            <ScrollView>
                <View className="mt-6 px-10 items-center">
                    
                    {photoIsLoading ?
                        <View role="status" className="w-[110px] aspect-square animate-pulse bg-gray-400 rounded-full"></View>
                        :
                        <UserPhoto
                            source={ 
                                user.avatar 
                                ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}`}
                                : defaultUserPhotoImg}
                            alt="Foto do usuário"
                            size={110}
                        />
                    }
                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text className="text-green-500 text-md font-bold mt-2 mb-8">
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Controller 
                        control={control}
                        name="name"
                        render={({ field: {value, onChange}}) => (
                            <Input
                                placeholder="Nome"
                                bg="bg-gray-600"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="email"
                        render={({ field: {value, onChange}}) => (
                            <Input
                                placeholder="E-mail"
                                bg="bg-gray-600"
                                readOnly
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                </View>
                <View className="px-10 mt-12 mb-9">
                    <Text className="text-gray-200 text-md font-heading mb-2">Alterar senha</Text>
                    <Controller 
                        control={control}
                        name="old_password"
                        render={({ field: {onChange}}) => (
                            <Input
                                placeholder="Senha antiga"
                                bg="bg-gray-600"
                                secureTextEntry
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="password"
                        render={({ field: {onChange}}) => (
                            <Input
                                placeholder="Nova senha"
                                bg="bg-gray-600"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name="confirm_password"
                        render={({ field: {onChange}}) => (
                            <Input
                                placeholder="Confirme a nova senha"
                                bg="bg-gray-600"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.confirm_password?.message}
                            />
                        )}
                    />
                    
                    <View className="mt-4">
                        <Button
                            title="Atualizar"
                            onPress={handleSubmit(handleProfileUpdate)}
                            isLoading={isUpdating}
                            disabled={isUpdating}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}