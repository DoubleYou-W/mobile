import { ScrollView, ScrollViewProps } from "react-native";

import { View, ViewProps } from "./view";

export type PageProps = ScrollViewProps & ViewProps & {
  padTop?: boolean | number;
  padBottom?: boolean | number;
  padLeft?: boolean | number;
  padRight?: boolean | number;

  scrollable?: boolean;
};

export const Page = ({
  padTop = false,
  padBottom = false,
  padLeft = false,
  padRight = false,

  scrollable = false,
  
  children,
  ...props
}: PageProps) => {
  const V = scrollable ? ScrollView : View;

  let paddingTop: number = typeof padTop == "boolean" ? (padTop ? 20 : 0) : padTop;
  let paddingBottom: number = typeof padBottom == "boolean" ? (padBottom ? 20 : 0) : padBottom;
  let paddingLeft: number = typeof padLeft == "boolean" ? (padLeft ? 20 : 0) : padLeft;
  let paddingRight: number = typeof padRight == "boolean" ? (padRight ? 20 : 0) : padRight;

  const innerView = (
    <View
      {...props}

      style={[{
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
      }, props.style]}
      
      className={`h-full w-full bg-background ${props.className}`}
    >
      {children}
    </View>
  )

  if (scrollable) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {innerView}
      </ScrollView>
    );
  }

  return innerView;
};
