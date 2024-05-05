import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
    bg?: string;
    errorMessage?: string | null;
}

export function Input({bg = 'bg-gray-700', errorMessage = null, ...rest}: Props) {
    const isInvalid = !! errorMessage;
    return (
        <View className="mb-4 w-full">
            <TextInput
                className={`${bg} h-14 w-full px-4 text-md text-white font-body placeholder:text-gray-300  rounded-sm ${isInvalid ?'border-[1px] invalid:border-red-500' : 'focus:border-[1px] focus:border-green-500'} read-only:opacity-50`}
                {...rest}
            />
            { isInvalid &&
                <Text className="text-red-500">{errorMessage}</Text>
            }
        </View>
    );
}