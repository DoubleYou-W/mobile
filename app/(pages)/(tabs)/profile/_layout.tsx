import { Slot, Stack } from "expo-router";

const ProfileTabLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: "#000",
        },
      }}
    />
  );
}

export default ProfileTabLayout;