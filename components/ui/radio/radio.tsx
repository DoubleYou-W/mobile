import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export type RadioProps = TouchableOpacityProps & {
  value: boolean;

  size?: number;
};

export const Radio = ({
  value,

  size = 20,

  ...props
}: RadioProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}

      {...props}

      className={`flex flex-row items-center ${props.className}`}
    >
      <MaterialCommunityIcons
        name={value ? "radiobox-marked" : "radiobox-blank"}
        size={size}
        className={value ? "color-primary" : "color-primary-foreground"}
      />

      {props.children}
    </TouchableOpacity>
  );
};
