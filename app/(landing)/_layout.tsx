import { getColor } from "@/utils/colors";

import { Stack } from "expo-router";

const LandingLayout = () => {
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
        name="index"

        options={{
          headerLeft: () => null,
        }}
      />

      <Stack.Screen
        name="host"
      />
    </Stack>
  );
}

export default LandingLayout;