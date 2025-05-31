import { Pressable } from "react-native";

import { Text, TextProps } from "./text";

export type PressableTextProps = TextProps & {  
  onPress: () => void;
};

export const PressableText = ({
  onPress,

  children,
  ...props
}: TextProps) => {
  return (
    <Pressable
      onPress={onPress}
    >
      <Text
        {...props}
      >
        {children}
      </Text>
    </Pressable>
  );
};