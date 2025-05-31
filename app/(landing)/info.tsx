import axios from "axios";
import { useEffect, useState } from "react";
import { Keyboard, Pressable } from "react-native";

import { KeyboardAvoidingView, KeyboardController } from "react-native-keyboard-controller";
import Animated from "react-native-reanimated";

import { router } from "expo-router";

import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';

import { useAnimatedShake } from "@/hooks/useAnimatedShake";

import { paths } from "@/config/paths";

import { SubmissionState, Submittable } from "@/components/layout/Submittable";
import { Button } from "@/components/ui/button";
import { Page, SafeAreaView, View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { FormField } from "@/components/ui/form-field";
import { Radio } from "@/components/ui/radio";

const LandingPage = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [type, setType] = useState<'work' | 'education' | 'health'>('work');
  const [about, setAbout] = useState<string>("");

  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

  const [host, setHost] = useState<string | null>(null);

  useEffect(() => {
    const fetchHost = async () => {
      try {
        setHost(await SecureStore.getItemAsync("host") || null);
      } catch (error) {
        setHost(null);
      }
    };

    fetchHost();
  }, []);

  const { shake: shakeName, shakeStyle: nameShakeStyle } = useAnimatedShake();
  const { shake: shakeAge, shakeStyle: ageShakeStyle } = useAnimatedShake();
  const { shake: shakeGender, shakeStyle: genderShakeStyle } = useAnimatedShake();
  const { shake: shakeAbout, shakeStyle: aboutShakeStyle } = useAnimatedShake();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!name || name.trim() === "" || name.length < 2) {
      shakeName();
      return;
    }

    if (!age || age.trim() === "" || isNaN(Number(age)) || Number(age) < 0 || Number(age) > 120) {
      shakeAge();
      return;
    }

    if (!about || about.trim() === "" || about.length < 10) {
      shakeAbout();
      return;
    }
      
    setSubmissionState('loading');

    try {
      console.log('sending to', `${host}/api/personal`);
      const result = await axios.post(`${host}/api/personal`, {
        name,
        age: Number(age),
        gender,
        about,
        category: type
      }, {
        timeout: 3000
      });

      if (result.status !== 200) {
        setSubmissionState('error');
        console.error("Failed to save info:", result.data);
        return;
      }

      setSubmissionState('success');
      console.debug("Info saved successfully:", result.data);

      SecureStore.setItemAsync("finishedSetup", "true");
    } catch (error) {
      setSubmissionState('error');
      console.error("Failed to save info:", error);
      return;
    }
  }

  const handleSuccess = () => {
    router.replace(paths.tabs.index.getHref());
  }

  const handleError = () => {
    setSubmissionState('idle');
  }

  return (
    <Pressable onPress={() => Keyboard.dismiss()} className="flex-1">
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={40}
        style={{ flex: 1 }}
      >
        <Submittable submissionState={submissionState} onSuccessFinish={handleSuccess} onErrorFinish={handleError}>
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
              <View className="gap-5 w-full items-center">
                <View className="gap-1 items-center">
                  <Text variant="page_title">
                    Let's get to know you!
                  </Text>

                  <Text variant="page_subtitle">
                    What should your assistant know about you?
                  </Text>
                </View>

                <View className="gap-4 w-full">
                  <Animated.View style={[{ width: "100%" }, nameShakeStyle]}>
                    <FormField
                      label=""
                      placeholder="Your Name"
                      autoCapitalize="words"
                      autoComplete="name"
                      autoCorrect={false}
                      keyboardType="default"
                      className="py-3"
                      
                      value={name}
                      onChangeText={(text) => setName(text)}
                      
                      onSubmitEditing={() => KeyboardController.setFocusTo("next")}

                      returnKeyLabel="next"
                      returnKeyType="next"
                    />
                  </Animated.View>

                  <Animated.View style={[{ width: "100%" }, ageShakeStyle]}>
                    <FormField
                      label=""
                      placeholder="Age"
                      autoComplete="off"
                      autoCorrect={false}
                      keyboardType="number-pad"
                      className="py-3"
                      
                      value={age}
                      onChangeText={(text) => setAge(text)}

                      onSubmitEditing={() => KeyboardController.setFocusTo("next")}

                      returnKeyLabel="next"
                      returnKeyType="next"
                    />
                  </Animated.View>

                  {/* Gender */}
                  <Animated.View className="gap-1" style={[{ width: "100%" }, genderShakeStyle]}>
                    <Text variant="paragraph_title">
                      Gender
                    </Text>
                    <View className="flex-row gap-10">
                      <Pressable className="flex-row items-center gap-2" onPress={() => setGender('male')}>
                        <Radio
                          value={gender === 'male'}
                          
                          size={24}
                          className='color-primary'

                          disabled={true}
                        />

                        <Text variant="subsection_option">{'Male'}</Text>
                      </Pressable>

                      <Pressable className="flex-row items-center gap-2" onPress={() => setGender('female')}>
                        <Radio
                          value={gender === 'female'}
                          
                          size={24}
                          className='color-primary'

                          disabled={true}
                        />

                        <Text variant="subsection_option">{'Female'}</Text>
                      </Pressable>
                    </View>
                  </Animated.View>

                  <Animated.View className="gap-1" style={[{ width: "100%" }, genderShakeStyle]}>
                    <Text variant="paragraph_title">
                      Assistant Type
                    </Text>
                    <View className="flex-row gap-10">
                      <Pressable className="flex-row items-center gap-2" onPress={() => setType('work')}>
                        <Radio
                          value={type === 'work'}
                          
                          size={24}
                          className='color-primary'

                          disabled={true}
                        />

                        <Text variant="subsection_option">{'Work'}</Text>
                      </Pressable>

                      <Pressable className="flex-row items-center gap-2" onPress={() => setType('education')}>
                        <Radio
                          value={type === 'education'}
                          
                          size={24}
                          className='color-primary'

                          disabled={true}
                        />

                        <Text variant="subsection_option">{'Education'}</Text>
                      </Pressable>

                      <Pressable className="flex-row items-center gap-2" onPress={() => setType('health')}>
                        <Radio
                          value={type === 'health'}
                          
                          size={24}
                          className='color-primary'

                          disabled={true}
                        />

                        <Text variant="subsection_option">{'Health'}</Text>
                      </Pressable>
                    </View>
                  </Animated.View>

                  {/* About yourself */}
                  <Animated.View style={[{ width: "100%" }, aboutShakeStyle]}>
                    <FormField
                      label=""
                      placeholder="I'm a computer science student at The Hebrew University of Jerusalem..."
                      autoComplete="off"
                      autoCorrect={false}
                      keyboardType="default"

                      multiline
                      numberOfLines={4}
                      style={{ height: 3.5 * 20 }}
                      
                      value={about}
                      onChangeText={(text) => setAbout(text)}

                      onSubmitEditing={() => KeyboardController.setFocusTo("next")}

                      returnKeyLabel="enter"
                      returnKeyType="default"
                    />
                  </Animated.View>
                </View>
              </View>

              <Button
                label="Next"
                
                variant="primary"
                size="md_wide"
                
                onPress={handleSubmit}
              />
            </Page>
          </SafeAreaView>
        </Submittable>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

export default LandingPage;