import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export function Profile() {
    const [photoIsLoading, sePhotoIsLoading] = useState(false);

    return(
        <View className="flex-1 w-full">
            <ScreenHeader title="Perfil"/>
            <ScrollView>
                <View className="mt-6 px-10 items-center">
                    
                    {photoIsLoading ?
                        <View role="status" className="w-[110px] aspect-square animate-pulse bg-gray-400 rounded-full"></View>
                        :
                        <UserPhoto
                            source={{ uri: 'https://github.com/lucasgmaieski.png'}}
                            alt="Foto do usuário"
                            size={110}
                        />
                    }
                    <TouchableOpacity>
                        <Text className="text-green-500 text-md font-bold mt-2 mb-8">
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Input
                        placeholder="Nome"
                        bg="bg-gray-600"
                    />
                    <Input
                        placeholder="Email"
                        bg="bg-gray-600"
                        value="lucasgrigol@gmail.com"
                        readOnly
                    />
                </View>
                <View className="px-10 mt-12 mb-9">
                    <Text className="text-gray-200 text-md font-heading mb-2">Alterar senha</Text>
                    <Input
                        placeholder="Senha antiga"
                        bg="bg-gray-600"
                        secureTextEntry
                    />
                    <Input
                        placeholder="Nova senha"
                        bg="bg-gray-600"
                        secureTextEntry
                    />
                    <Input
                        placeholder="Confirme a nova senha"
                        bg="bg-gray-600"
                        secureTextEntry
                    />

                    <View className="mt-4">
                        <Button
                            title="Atualizar"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}