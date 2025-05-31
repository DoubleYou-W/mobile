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

const HostPage = () => {
  const [host, setHost] = useState<string>("");

  const { shake: shakeHost, shakeStyle: hostShakeStyle } = useAnimatedShake();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const handleSave = async () => {
    if (!host || !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(host)) {
      shakeHost();
      console.error("Invalid host URL format.");
      return;
    }
    
    SecureStore.setItemAsync("host", host);
    router.back();
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
                What is your DoubleYou server address?
              </Text>
            </View>

            <View className="gap-4 w-full">
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
                    handleSave();
                  }}

                  returnKeyLabel="done"
                  returnKeyType="done"
                />
              </Animated.View>
            </View>
          </View>

          <Button
            label="Save"
            
            variant="primary"
            size="md_wide"
            
            onPress={handleSave}
          />
        </Page>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default HostPage;