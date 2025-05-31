import { Slot, Stack } from 'expo-router';

import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StatusBar } from "@/components/layout/StatusBar";

import * as SplashScreen from 'expo-splash-screen';

import "@/config/nativewind";
import "@/global.css";
import 'react-native-reanimated';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { LocationProvider } from '@/context/LocationContext';
import { ContactsProvider } from '@/context/ContactsContext';
import { CalendarProvider } from '@/context/CalendarContext';
import { HealthProvider } from '@/context/HealthContext';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true });

const RootLayout = () => {
  return (
    <ThemeProvider value={DarkTheme}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <LocationProvider>
            <ContactsProvider>
              <CalendarProvider>
                <HealthProvider>
                  <GestureHandlerRootView>
                    <Slot />

                    <StatusBar />
                  </GestureHandlerRootView>
                </HealthProvider>
              </CalendarProvider>
            </ContactsProvider>
          </LocationProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default RootLayout;