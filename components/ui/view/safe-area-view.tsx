import { Platform } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View, ViewProps } from "./view";

export type SafeAreaViewProps = ViewProps & {
  safeTop?: boolean;
  safeBottom?: boolean;
  safeLeft?: boolean;
  safeRight?: boolean;
};

export const SafeAreaView = ({
  safeTop = false,
  safeBottom = false,
  safeLeft = false,
  safeRight = false,
  
  children,
  ...props
}: SafeAreaViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}

      style={[{
        paddingTop: (safeTop ? insets.top : 0),
        paddingBottom: (safeBottom ? insets.bottom + (Platform.OS === 'android' ? 0 /* 34 */ : 0) : 0),
        paddingLeft: (safeLeft ? insets.left : 0),
        paddingRight: (safeRight ? insets.right : 0),
      }, props.style]}

      className={`h-full w-full bg-background ${props.className}`}
    >
      {children}
    </View>
  );
};
