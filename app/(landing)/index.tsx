import { useEffect } from "react";

import * as SplashScreen from 'expo-splash-screen';
import { Image } from "expo-image";

import { Button } from "@/components/ui/button";
import { Page, SafeAreaView, View } from "@/components/ui/view";
import { router } from "expo-router";
import { paths } from "@/config/paths";
import { Text } from "@/components/ui/text";

const LandingPage = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaView
      loading={false}
      
      safeTop
      safeBottom
    >
      <Page
        padTop={80}
        padBottom={40}
        padLeft
        padRight
        
        className="justify-between items-center"
      >
        <View className="gap-0 items-center">
          <Image
            source={require('@/assets/branding/logo_light.png')}
            contentFit="contain"
            className="w-40 h-40 mb-4"
          />
          <Text variant="section_header" className="text-3xl no-underline mt-[-30]">
            DoubleYou
          </Text>
        </View>

        <Button
          label="Get Started"
          
          variant="primary"
          size="md_wide"
          
          onPress={() => {
            router.push(paths.landing.host.getHref());
          }}
        />
      </Page>
    </SafeAreaView>
  );
}

export default LandingPage;