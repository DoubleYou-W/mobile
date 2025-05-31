import { I18nManager, TouchableOpacity } from "react-native";

import { router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const HeaderBackButton = () => {
  if (!router.canGoBack()) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}

      className="flex-row items-start"
      
      onPress={() => router.back()}
    >
      <FontAwesome6 name={I18nManager.isRTL ? "chevron-right" : "chevron-left"} size={20} className="color-primary-foreground" />
    </TouchableOpacity>
  );
}