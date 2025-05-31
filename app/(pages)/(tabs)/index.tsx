import { useEffect, useState } from 'react';

import * as SplashScreen from 'expo-splash-screen';

import { useRef } from 'react';
import { FlatList } from 'react-native';

import { Page, SafeAreaView, View } from "@/components/ui/view";
import { Text } from '@/components/ui/text';
import { Pressable, TextInput } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import TypingDots from '@/components/layout/TypingDots';
import axios from 'axios';

import * as SecureStore from "expo-secure-store";
import { getColor } from '@/utils/colors';

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  loading?: boolean;
}

const HomeTabPage = () => {
  const [host, setHost] = useState<string | null>(null);

  const [message, setMessage] = useState<string>("");
  
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: 'Hello! How can I assist you today?',
    sender: 'assistant'
  }]);

  const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);

  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    SplashScreen.hideAsync();

    const fetchHost = async () => {
      try {
        setHost(await SecureStore.getItemAsync("host") || null);
      } catch (error) {
        setHost(null);
      }
    };

    fetchHost();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    setWaitingForResponse(true);

    // if the last message is still loading, remove it
    if (messages[messages.length - 1].loading) {
      setMessages(prev => prev.slice(0, -1));
    }

    // add the user message to the list
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), content: message, sender: 'user' },
      { id: (Date.now() + 1).toString(), content: "...", sender: 'assistant', loading: true }
    ]);
    setMessage("");

    const result = await axios.post(`${host}/api/talk`, { prompt: message });
    setWaitingForResponse(false);
    
    setMessages(prev => {
      // remove the last loading message
      const updatedMessages = prev.slice(0, -1);
      // add the new response message
      return [
        ...updatedMessages,
        { id: Date.now().toString(), content: result.data.response, sender: 'assistant' }
      ];
    });
  }

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
          
          className="justify-between h-full items-center"
        >
          <View className="flex-1 w-full">
            <FlatList
              ref={listRef}

              data={messages}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isUser = item.sender === 'user';
                const bubbleColor = isUser ? getColor('primary') : '#E5E7EB'; // blue or gray
                const textColor = isUser ? 'white' : 'black';
                const alignSelf = isUser ? 'flex-end' : 'flex-start';

                return (
                  <View style={{ alignSelf, maxWidth: '80%', marginBottom: 8 }}>
                    <View style={{
                      backgroundColor: bubbleColor,
                      borderColor: bubbleColor,
                      borderWidth: 1,
                      borderRadius: 18,
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                      position: 'relative'
                    }}>
                      {item.loading ? (
                        <TypingDots />
                      ) : (
                        <Text variant="info" style={{ color: textColor }}>
                          {item.content}
                        </Text>
                      )}

                      {/* Chat bubble tail */}
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          [isUser ? 'right' : 'left']: -6,
                          width: 12,
                          height: 12,
                          backgroundColor: bubbleColor,
                          borderColor: bubbleColor,
                          borderBottomLeftRadius: isUser ? 0 : 6,
                          borderBottomRightRadius: isUser ? 6 : 0,
                          transform: [{ rotate: isUser ? '45deg' : '-45deg' }],
                        }}
                      />
                    </View>
                  </View>
                );
              }}

              onContentSizeChange={() => {
                listRef.current?.scrollToEnd({ animated: true });
              }}
            />
          </View>
          
          <View className="w-full flex-row gap-2 py-5 items-center">
            <TextInput
              placeholder="What's on your mind?"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={true}
              keyboardType="default"

              className="text-left py-3 px-4 bg-card-accent rounded-md text-white"
              style={{ flex: 8 }}

              autoFocus
              
              value={message}
              onChangeText={setMessage}
              
              onSubmitEditing={handleSend}
              returnKeyLabel="send"
              returnKeyType="send"
            />

            <Pressable
              className={`${waitingForResponse ? "bg-gray-400" : "bg-primary"} p-2 rounded-full items-center justify-center`}
              onPress={handleSend}
              disabled={waitingForResponse}
            >
              <MaterialCommunityIcons size={24} name={"send"} color="white" />
            </Pressable>
          </View>
        </Page>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default HomeTabPage;