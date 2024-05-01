import { Pressable, Text, PressableProps } from "react-native";

type Props = PressableProps & {
    name: string;
    isActive: boolean;
}
export function Group({name, isActive, ...rest}: Props) {
    return (
        <Pressable 
            className={`mr-3 w-24 h-10 bg-gray-600 rounded-md justify-center items-center overflow-hidden active:border-green-500 active:border-[1px] ${isActive ? 'border-[1px] border-green-500' : ''}`}
            
            {...rest}
        >
            <Text className="text-gray-200 text-xs uppercase font-bold">
                {name}
            </Text>
        </Pressable>
    );  
}