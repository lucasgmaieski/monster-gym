import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    title: string;
    variant?: 'outline' | 'unstyled' | 'solid';
}
export function Button({title, variant = 'solid', ...rest}: Props) {
    return (
        <TouchableOpacity
            className={`w-full ${variant === 'outline'? 'bg-transparent border-[1px] border-green-500 active:bg-gray-500' : 'bg-green-700 active:bg-green-500'} h-14 items-center justify-center rounded-sm `}
            activeOpacity={1}
            {...rest}
         >
            <Text className={`${variant === 'outline' ? 'text-green-500' : 'text-white'} text-sm font-heading`}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}