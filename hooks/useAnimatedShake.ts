import { useCallback } from "react";

import { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming, Easing } from "react-native-reanimated"

export const useAnimatedShake = () => {
  const shakeTranslateX = useSharedValue(0);

  const shake = useCallback(() => {
    const translationAmount = 10;

    const timingConfig = {
      duration: 80,
      easing: Easing.inOut(Easing.ease)
    }

    shakeTranslateX.value = withSequence(
      withTiming(translationAmount, timingConfig),
      withRepeat(withTiming(-translationAmount, timingConfig), 3, true),
      withSpring(0, { mass: 0.5 })
    )
  }, []);

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: shakeTranslateX.value }
      ]
    }
  }, []);

  return {
    shake,
    shakeStyle
  }
}