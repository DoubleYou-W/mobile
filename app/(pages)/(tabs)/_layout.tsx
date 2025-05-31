import { Pressable } from 'react-native';

import { Tabs } from 'expo-router';
import { Image } from 'expo-image';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { getColor } from "@/utils/colors";

import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: getColor('tab'),
          borderTopWidth: 0,
        },

        tabBarInactiveTintColor: getColor('tab', 'inactive'),
        tabBarActiveTintColor: getColor('tab', 'active'),
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Inter_500Medium',
          textTransform: 'capitalize',
        },

        headerShown: true,
        headerTitle: "DoubleYou",
        headerBackground: () => (
          <View className="h-full w-full bg-background flex flex-row justify-between items-end"/>
        ),
        headerLeft: () => (
          <Pressable className='flex-row items-center gap-2 ml-3'>
            <Image
              source={require('@/assets/branding/logo_light.png')}
              contentFit="contain"
              className="w-12 h-12"
            />
          </Pressable>
        ),
        headerRight: () => null
      }}
    >
      <Tabs.Screen
        name="summary"
        options={{
          title: "Summary",

          lazy: false,

          tabBarIcon: ({ color, focused }) => <FontAwesome6 size={20} name={"newspaper"} color={color} solid /> ,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          lazy: false,

          tabBarIcon: ({ color, focused }) => <FontAwesome6 size={20} name={"house"} color={color} solid />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          lazy: false,

          tabBarIcon: ({ color, focused }) => <FontAwesome6 size={20} name={"user"} color={color} solid />,
        }}
      />
    </Tabs>
  );
}

export default TabsLayout;