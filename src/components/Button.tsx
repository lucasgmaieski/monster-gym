import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Loading } from "./Loading";

type Props = TouchableOpacityProps & {
    title: string;
    variant?: 'outline' | 'unstyled' | 'solid';
    isLoading?: boolean;
}
export function Button({title, variant = 'solid', isLoading = false, ...rest}: Props) {
    return (
        <TouchableOpacity
            className={`w-full ${variant === 'outline'? 'bg-transparent border-[1px] border-green-500 active:bg-gray-500' : 'bg-green-700 active:bg-green-500 disabled:opacity-50'} h-14 items-center justify-center rounded-sm `}
            activeOpacity={1}
            {...rest}
         >
            {isLoading ?
                <ActivityIndicator className="color-white" />
            :
                <Text className={`${variant === 'outline' ? 'text-green-100' : 'text-white'} text-sm font-heading`}>
                    {title}
                </Text>

            }
        </TouchableOpacity>
    );
}