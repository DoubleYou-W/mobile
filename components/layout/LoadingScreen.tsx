import { View } from "react-native";

import LottieView from "lottie-react-native";

export const LoadingScreen = () => {
  return (
    <View className="w-full h-full justify-center items-center">
      <LottieView
        source={require('@/assets/lottie/loading.json')}

        style={{ width: 75, height: 75 }}

        autoPlay
        loop

        onAnimationFinish={(isCanceled) => {
          if (isCanceled) return;
        }}
      />
    </View>
  );
};