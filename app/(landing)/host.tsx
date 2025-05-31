import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

import { KeyboardAvoidingView } from "react-native-keyboard-controller";

import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";

import * as SplashScreen from 'expo-splash-screen';

import { paths } from "@/config/paths";

import { Button } from "@/components/ui/button";
import { Page, SafeAreaView, View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { FormField } from "@/components/ui/form-field";
import { useAnimatedShake } from "@/hooks/useAnimatedShake";
import Animated from "react-native-reanimated";

const LandingPage = () => {
  const [host, setHost] = useState<string>("");

  const { shake: shakeHost, shakeStyle: hostShakeStyle } = useAnimatedShake();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const handleSubmit = async () => {
    if (!host || !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(host)) {
      shakeHost();
      console.error("Invalid host URL format.");
      return;
    }
    
    SecureStore.setItemAsync("host", host);
    router.push(paths.landing.info.getHref());
  }

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={40}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        loading={false}
        
        safeBottom
      >
        <Page
          padTop={20}
          padBottom={40}
          padLeft
          padRight
          
          className="justify-between items-center"
        >
          <View className="gap-10 w-full items-center">
            <View className="gap-1 items-center">
              <Text variant="page_title">
                Welcome to DoubleYou
              </Text>

              <Text variant="page_subtitle" className="text-white">
                Your personal, personal assistant.
              </Text>
            </View>

            <View className="gap-1 w-full">
              <Text variant="paragraph_title">
                What is DoubleYou?
              </Text>

              <Text variant="paragraph">
                DoubleYou is a self-hosted solution for a real personal assistant. All your information at the tip of your fingers, without the need for a third-party service. All your data, all your control.
              </Text>
            </View>
          </View>

          <View className="w-full gap-10 items-center">
            <View className="gap-2 w-full">
              <Text variant="paragraph_title">
                What is your DoubleYou server address?
              </Text>

              <Text variant="paragraph">
                To make sure all your data is safe, we need to know where to store it. Please provide the URL of your DoubleYou instance.
              </Text>

              <Animated.View style={[{ width: "100%" }, hostShakeStyle]}>
                <FormField
                  label=""
                  placeholder="https://your-host-url.com"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  keyboardType="url"
                  className="py-3"

                  value={host}
                  onChangeText={(text) => setHost(text)}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                    handleSubmit();
                  }}

                  returnKeyLabel="done"
                  returnKeyType="done"
                />
              </Animated.View>
            </View>

            <Button
              label="Next"
              
              variant="primary"
              size="md_wide"
              
              onPress={handleSubmit}
            />
          </View>
        </Page>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default LandingPage;