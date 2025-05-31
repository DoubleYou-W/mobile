import { useEffect, useState } from 'react';

import { useRef } from 'react';
import { FlatList } from 'react-native';

import { Page, SafeAreaView, View } from "@/components/ui/view";
import { Text } from '@/components/ui/text';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import TypingDots from '@/components/layout/TypingDots';
import { Message } from '../index';
import axios from 'axios';

import * as SecureStore from "expo-secure-store";

const SummaryTabPage = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: "intro",
    content: "Hold tight while I'm grabbing your daily summary!",
    sender: "assistant",
    loading: false
  }]);

  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: "summary",
        content: "Loading summary...",
        sender: "assistant"
      }
    ]);

    const fetchSummary = async () => {
      try {
        const host = await SecureStore.getItemAsync("host");

        if (host) {
          const result = await axios.get(`${host}/api/summary`);
          
          setMessages(prev => {
            const updatedMessages = prev.slice(0, -1);

            return [
              ...updatedMessages,
              { id: Date.now().toString(), content: result.data.summary, sender: 'assistant' }
            ];
          });
        }
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      }
    };

    fetchSummary();
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
          
          className="justify-between h-full items-center"
        >
          <View className="flex-1 w-full">
            <FlatList
              ref={listRef}
              data={messages}
              keyExtractor={(item) => item.id || "."}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isUser = false;
                const bubbleColor = isUser ? '#3B82F6' : '#E5E7EB';
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
                      position: 'relative',
                    }}>
                      {item.loading === true ? (
                        <TypingDots />
                      ) : (
                        <Text variant="info" style={{ color: textColor }}>
                          {item.content}
                        </Text>
                      )}

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
        </Page>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default SummaryTabPage;