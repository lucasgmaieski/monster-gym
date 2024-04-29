import { Image, ImageProps } from "react-native";
type Props = ImageProps & {
    size: number;
}

export function UserPhoto({size, ...rest}: Props) {
    return (
        <Image
            width={size}
            height={size}
            className="rounded-full border-[1px] border-gray-400"
            {...rest}
        />

    );
}