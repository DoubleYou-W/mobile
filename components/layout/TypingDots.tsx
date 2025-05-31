import { useEffect, useRef } from "react";

import { Animated, Easing } from 'react-native';
import { View } from "../ui/view";

const TypingDots = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: -5,
            duration: 250,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 250,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    bounce(dot1, 0).start();
    bounce(dot2, 150).start();
    bounce(dot3, 300).start();
  }, []);

  return (
    <View className="flex-row space-x-1">
      {[dot1, dot2, dot3].map((anim, idx) => (
        <Animated.Text
          key={idx}
          style={{
            transform: [{ translateY: anim }],
            fontSize: 12,
            fontWeight: 'bold',
          }}
        >
          •
        </Animated.Text>
      ))}
    </View>
  );
};

export default TypingDots;