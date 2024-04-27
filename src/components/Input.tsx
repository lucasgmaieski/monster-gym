import { TextInput, TextInputProps } from "react-native";

export function Input({...rest}: TextInputProps) {
    return (
        <TextInput 
            className="bg-gray-700 h-14 px-4 text-md text-white font-body mb-4 placeholder:text-gray-300 focus:border-[1px] focus:border-green-500 rounded-sm"
            {...rest}
        />
    );
}