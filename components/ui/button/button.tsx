import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Text } from "../text";

export type ButtonVariants =
  | "primary"
  | "bordered";

export type ButtonSizes = 
  | "md" 
  | "md_thin"
  | "md_wide"
  | "md_wide_thin"
  | "md_full_thin";

const variants = {
  primary: {
    button: "bg-primary",

    disabled: "bg-disabled",
    disabled_text: "text-disabled-foreground",
  },

  bordered: {
    button: "border border-primary bg-transparent",

    disabled: "border border-primary/50 bg-transparent",
    disabled_text: "text-disabled-foreground",
  }
};

const sizes = {
  md: {
    button: "px-2 py-3",
  },
  md_thin: {
    button: "px-2 py-2",
  },
  md_wide: {
    button: "w-10/12 px-2 py-3",
  },
  md_wide_thin: {
    button: "w-10/12 px-2 py-2",
  },
  md_full_thin: {
    button: "w-full px-2 py-2",
  }
} as const;


export type ButtonProps = TouchableOpacityProps & {
  label: string;

  onPress: () => void;

  variant: ButtonVariants;
  size: ButtonSizes;
};

export const Button = ({
  label,

  onPress,

  variant,
  size,

  children,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}

      {...props}

      onPress={props.disabled ? undefined : onPress}

      className={`
        flex-row gap-2
        items-center justify-center
        rounded-full

        ${sizes[size].button}
        ${props.disabled ? variants[variant].disabled : variants[variant].button}
        ${props.disabled && "opacity-50"}

        ${props.className}
      `}
    >
      {children}
      
      <Text
        variant="button"

        className={`
          ${props.disabled && variants[variant].disabled_text}
          ${props.disabled && "opacity-50"}
      `}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};