import { useColorScheme } from "react-native";

import { StatusBar as StatusBarPrimitive, StatusBarProps as StatusBarPropsPrimitive } from "expo-status-bar";

import { getColor } from "@/utils/colors";

export type StatusBarProps = StatusBarPropsPrimitive;

export const StatusBar = ({ ...props }: StatusBarProps) => {
  const colorScheme = useColorScheme();

  return (
    <StatusBarPrimitive
      style={"light"}
      backgroundColor={getColor("background")}
      {...props}
    />
  );
};
