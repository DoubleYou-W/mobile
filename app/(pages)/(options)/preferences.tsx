import { useEffect, useState } from "react";
import { Switch } from "react-native";

import { KeyboardAvoidingView } from "react-native-keyboard-controller";

import * as SecureStore from 'expo-secure-store';

import { Page, SafeAreaView, View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { Image } from "expo-image";
import { getColor } from "@/utils/colors";

const PreferencesPage = () => {
  const [appleHealth, setAppleHealth] = useState<boolean>(true);
  const [calendar, setCalendar] = useState<boolean>(true);
  const [contacts, setContacts] = useState<boolean>(true);
  const [location, setLocation] = useState<boolean>(true);

  const [gmail, setGmail] = useState<boolean>(true);
  const [moodle, setMoodle] = useState<boolean>(true);
  const [whatsapp, setWhatsApp] = useState<boolean>(true);
  const [telegram, setTelegram] = useState<boolean>(true);

  useEffect(() => {
    setAppleHealth(SecureStore.getItem('appleHealth') === 'true');
    setCalendar(SecureStore.getItem('calendar') === 'true');
    setContacts(SecureStore.getItem('contacts') === 'true');
    setLocation(SecureStore.getItem('location') === 'true');
    
    setGmail(SecureStore.getItem('gmail') === 'true');
    setMoodle(SecureStore.getItem('moodle') === 'true');
    setWhatsApp(SecureStore.getItem('whatsapp') === 'true');
    setTelegram(SecureStore.getItem('telegram') === 'true');
  }, []);
  
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
                Select your preferences?
              </Text>
            </View>

            <View className="gap-4 w-full">

              <View className="flex-row gap-4 justify-between items-center">
                <View className="flex-row gap-2 items-center">
                  <Image
                    source="https://upload.wikimedia.org/wikipedia/commons/4/4e/Health_icon_iOS_12.png"
                    className="w-12 h-12"
                    contentFit="contain"
                  />
                  <Text variant="subsection_header">
                    Apple Health
                  </Text>
                </View>

                <Switch
                  value={appleHealth}
                  onValueChange={(value) => {
                    setAppleHealth(value);
                    SecureStore.setItem('appleHealth', value.toString());
                  }}
                  trackColor={{ true: getColor('primary'), false: "#ccc" }}
                  thumbColor="#fff"
                />
              </View>

              <View className="flex-row gap-4 justify-between items-center">
                <View className="flex-row gap-2 items-center">
                  <Image
                    source="https://upload.wikimedia.org/wikipedia/commons/1/1c/MacOSCalendar.png"
                    className="w-12 h-12"
                    contentFit="contain"
                  />
                  <Text variant="subsection_header">
                    Calendar
                  </Text>
                </View>

                <Switch
                  value={calendar}
                  onValueChange={(value) => {
                    setCalendar(value);
                    SecureStore.setItem('calendar', value.toString());
                  }}
                  trackColor={{ true: getColor('primary'), false: "#ccc" }}
                  thumbColor="#fff"
                />
              </View>

              <View className="flex-row gap-4 justify-between items-center">
                <View className="flex-row gap-2 items-center">
                  <Image
                    source="https://upload.wikimedia.org/wikipedia/commons/d/d5/Contacts_%28iOS%29.png"
                    className="w-12 h-12"
                    contentFit="contain"
                  />
                  <Text variant="subsection_header">
                    Contacts
                  </Text>
                </View>

                <Switch
                  value={contacts}
                  onValueChange={(value) => {
                    setContacts(value);
                    SecureStore.setItem('contacts', value.toString());
                  }}
                  trackColor={{ true: getColor('primary'), false: "#ccc" }}
                  thumbColor="#fff"
                />
              </View>

              <View className="flex-row gap-4 justify-between items-center">
                <View className="flex-row gap-2 items-center">
                  <Image
                    source="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/AppleMaps_logo.svg/2048px-AppleMaps_logo.svg.png"
                    className="w-12 h-12"
                    contentFit="contain"
                  />
                  <Text variant="subsection_header">
                    Location
                  </Text>
                </View>

                <Switch
                  value={location}
                  onValueChange={(value) => {
                    setLocation(value);
                    SecureStore.setItem('location', value.toString());
                  }}
                  trackColor={{ true: getColor('primary'), false: "#ccc" }}
                  thumbColor="#fff"
                />
              </View>

              {/* <View className="flex-row gap-4 justify-between items-center">
                <View className="flex-row gap-2 items-center">
                  <Image
                    source="https://9to5google.com/wp-content/uploads/sites/4/2020/11/gmail_ios.png"
                    className="w-12 h-12"
                    contentFit="contain"
                  />
                  <Text variant="subsection_header">
                    Gmail
                  </Text>
                </View>

                <Switch
                  value={gmail}
                  onValueChange={(value) => {
                    setGmail(value);
                    SecureStore.setItem('gmail', value.toString());
                  }}
                  trackColor={{ true: getColor('primary'), false: "#ccc" }}
                  thumbColor="#fff"
                />
              </View>

              <View className="flex-row gap-4 justify-between items-center">
                <View className="flex-row gap-2 items-center">
                  <Image
                    source="https://www.xelium.co.uk/wp-content/uploads/2015/06/Moodle-App-Logo.png"
                    className="w-12 h-12"
                    contentFit="contain"
                  />
                  <Text variant="subsection_header">
                    Moodle
                  </Text>
                </View>

                <Switch
                  value={moodle}
                  onValueChange={(value) => {
                    setMoodle(value);
                    SecureStore.setItem('moodle', value.toString());
                  }}
                  trackColor={{ true: getColor('primary'), false: "#ccc" }}
                  thumbColor="#fff"
                />
              </View>

              <View className="flex-row gap-4 justify-between items-center">
                <View className="flex-row gap-2 items-center">
                  <Image
                    source="https://cdn-icons-png.freepik.com/512/3536/3536445.png"
                    className="w-12 h-12"
                    contentFit="contain"
                  />
                  <Text variant="subsection_header">
                    WhatsApp
                  </Text>
                </View>

                <Switch
                  value={whatsapp}
                  onValueChange={(value) => {
                    setWhatsApp(value);
                    SecureStore.setItem('whatsapp', value.toString());
                  }}
                  trackColor={{ true: getColor('primary'), false: "#ccc" }}
                  thumbColor="#fff"
                />
              </View>

              <View className="flex-row gap-4 justify-between items-center">
                <View className="flex-row gap-2 items-center">
                  <Image
                    source="https://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-Telegram-icon.png"
                    className="w-12 h-12"
                    contentFit="contain"
                  />
                  <Text variant="subsection_header">
                    Telegram
                  </Text>
                </View>

                <Switch
                  value={telegram}
                  onValueChange={(value) => {
                    setTelegram(value);
                    SecureStore.setItem('telegram', value.toString());
                  }}
                  trackColor={{ true: getColor('primary'), false: "#ccc" }}
                  thumbColor="#fff"
                />
              </View> */}
            </View>
          </View>
        </Page>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default PreferencesPage;