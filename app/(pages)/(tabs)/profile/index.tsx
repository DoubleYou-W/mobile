import { useEffect, useState } from 'react';

import { Alert, TouchableOpacity } from 'react-native';

import { Page, SafeAreaView, View } from "@/components/ui/view";
import { Text } from '@/components/ui/text';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import axios from 'axios';

import * as SecureStore from "expo-secure-store";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import { paths } from '@/config/paths';

const ProfileOption = ({ name, onPress, icon }: { name: string, onPress: () => void, icon: string }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} className="flex-row rounded-md items-center w-full bg-card-accent p-4">
      <FontAwesome6 solid name={icon || "cog"} size={20} color="#fff" className="mr-3" />
      <Text variant="info" className="text-lg">{name}</Text>
    </TouchableOpacity>
  );
}

const ProfileTabPage = () => {
  const [name, setName] = useState<string | null>(null);
  const [about, setAbout] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const host = await SecureStore.getItemAsync("host");

        if (host) {
          axios.get(`${host}/api/personal`).then((result) => {
            setName(result.data.name);
            setAbout(result.data.about);
          });
        }
      }
      catch (error) {
        // Handle error, e.g., show a notification or log it
        console.error("Failed to fetch profile:", error);
      }
    };
  
    fetchProfile();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={95}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        loading={false}
      >
        <Page
          padTop={20}
          padBottom={0}
          padLeft
          padRight
          
          className="h-full items-center"
        >
          <View className="flex-1 w-full gap-10">
            <View className="items-center">
              <Text variant="page_title" className="text-2xl font-bold mb-4">Your Profile</Text>
              {name && <Text variant='info' className="text-lg mb-2">Name: {name}</Text>}
              {about && <Text variant='info' className="text-base">About: {about}</Text>}
            </View>

            <View className="gap-3">
              <ProfileOption
                name="Change Host"
                onPress={() => router.push(paths.options.host.getHref())}
                icon="server"
              />
              <ProfileOption
                name="Update Personal Information"
                onPress={() => router.push(paths.options.info.getHref())}
                icon="address-card"
              />
              <ProfileOption
                name="Preferences"
                onPress={() => router.push(paths.options.preferences.getHref())}
                icon="gear"
              />
              <ProfileOption
                name="Delete Data"
                onPress={() => {
                  Alert.alert(
                    "Delete Data",
                    "Are you sure you want to delete all your data? This action cannot be undone.",
                    [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      {
                        text: "Delete",
                        style: "destructive",
                      }
                    ]
                  );
                }}
                icon="trash-can"
              />
            </View>
          </View>
        </Page>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default ProfileTabPage;