import { useEffect, useState } from "react";

import * as SecureStore from 'expo-secure-store';

import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";

import { router } from "expo-router";

import { paths } from "@/config/paths";

const RootPage = () => {
  const [finishedSetup, setFinishedSetup] = useState<boolean>(false);

  let [loadedFonts] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    // SecureStore.deleteItemAsync("finishedSetup");
    // SecureStore.deleteItemAsync("host");
    
    const getSetupStatus = async () => {
      try {
        const status = await SecureStore.getItemAsync("finishedSetup");
        setFinishedSetup(status === "true");
      } catch (error) {
        setFinishedSetup(false);
      }
    };

    getSetupStatus();
  }, []);

  useEffect(() => {
    if (!loadedFonts) {
      return;
    }

    if (!finishedSetup) {
      console.debug(`Setup not finished, redirecting to landing page.`);
      router.replace(paths.landing.getHref());
    } else {
      console.debug(`Setup finished, redirecting to home page.`);
      router.replace(paths.tabs.index.getHref());
    }
  }, [loadedFonts, finishedSetup]);

  return null;
}

export default RootPage;