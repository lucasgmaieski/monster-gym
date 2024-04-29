import { TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
    bg?: string;
}

export function Input({bg = 'bg-gray-700', ...rest}: Props) {
    return (
        <TextInput 
            className={`${bg} h-14 w-full px-4 text-md text-white font-body mb-4 placeholder:text-gray-300 focus:border-[1px] focus:border-green-500 rounded-sm`}
            {...rest}
        />
    );
}