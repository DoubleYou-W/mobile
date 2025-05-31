import { getColor } from "@/utils/colors";

import { Stack } from "expo-router";

const PagesLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        animation: 'ios_from_right',

        title: "",

        headerTintColor: getColor("foreground"),
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: getColor("background"),
        },

        // headerLeft: () => <HeaderBackButton />,
      }}
    >
      <Stack.Screen
        name="(tabs)"

        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="(options)"
      />
    </Stack>
  );
}

export default PagesLayout;