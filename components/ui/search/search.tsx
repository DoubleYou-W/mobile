import { useEffect, useState } from "react";

import { I18nManager, Platform, TextInput, TextInputProps } from "react-native";

import { useIsFocused } from "@react-navigation/native";

import FeatherIcon from "@expo/vector-icons/Feather";

import { View } from "@/components/ui/view";

export type SearchSizes = 
  | "md_wide"
  | "md_full";

const sizes = {
  md_wide: "w-10/12",
  md_full: "w-full",
} as const;

export type SearchProps = TextInputProps & {
  size: SearchSizes;
};

export const Search = ({ size, ...props }: SearchProps) => {
  const isFocused = useIsFocused();
  
  const [align, setAlign] = useState<"left" | "right">("left");

  useEffect(() => {
    if (Platform.OS !== "android") {
      setAlign(I18nManager.isRTL ? "right" : "left");
      return;
    }

    // this makes the placeholder text align to the right when the screen is focused
    // this is a workaround for the issue where the placeholder text disappears when navigating back to the page
    // https://github.com/facebook/react-native/issues/31946
    if (isFocused && I18nManager.isRTL) {
      setAlign("right");
    } else {
      setAlign("left");
    }
  }, [isFocused]);

  return (
    <View className={`h-8 justify-center items-center p-0 ${sizes[size]}`}>
      <TextInput
        inputMode="search"

        returnKeyLabel="done"
        returnKeyType="done"

        autoComplete="off"
        autoCorrect={false}

        textAlign={align}

        {...props}

        style={{ paddingVertical: 0, textAlignVertical: "center" }}

        className={`
          w-full flex-1

          rounded-full
          pl-8 pr-6 ${Platform.OS === "ios" && "py-2"}

          font-interlight

          bg-search

          shadow-sm

          text-search-foreground
          ${"placeholder:text-search-placeholder"}

          ${props.className}
        `}
      />

      <FeatherIcon
        name={"search"}
        size={16}
        className={`
          absolute left-2 flex self-center color-search-foreground
        `}
      />
    </View>
  );
};
