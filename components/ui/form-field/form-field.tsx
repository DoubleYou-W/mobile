import { useEffect, useRef } from "react";

import { I18nManager, TextInput, TextInputProps } from "react-native";

import { Text } from "@/components/ui/text/text";
import { View } from "@/components/ui/view/view";

export type FormFieldVariant =
  | "default"
  | "default_large";

const variants: Record<FormFieldVariant, string> = {
  default: "py-2 px-2 bg-card-accent rounded-small text-primary-foreground text-start font-interregular placeholder:text-primary-foreground/30",
  default_large: "py-4 px-4 bg-card-accent rounded-small text-primary-foreground text-start font-interregular placeholder:text-primary-foreground/30",
};

export type FormFieldProps = TextInputProps & {
  variant?: FormFieldVariant;

  label?: string;

  autoFocus?: boolean;
};

export const FormField = ({
  variant = "default",

  label,

  autoFocus = false,

  children,

  ...props
}: FormFieldProps) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => autoFocus && inputRef.current?.focus(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      className={`w-full gap-1`}
    >
      {label && <Text variant="input_label" className="self-start">{label}</Text>}

      <View>
        <TextInput
          ref={inputRef}

          textAlign={I18nManager.isRTL ? "right" : "left"}

          {...props}

          className={`
            w-full

            font-interregular

            ${variants[variant]}

            ${props.multiline && "placeholder:align-top"}
            ${props.className}
          `}
        />

        {children}
      </View>
    </View>
  );
};

