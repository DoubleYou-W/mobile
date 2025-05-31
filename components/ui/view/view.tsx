import { View as ViewPrimitive, ViewProps as ViewPropsPrimitive, StyleSheet } from "react-native";

import { LoadingScreen } from "@/components/layout/LoadingScreen";

export type ViewProps = ViewPropsPrimitive & {
  loading?: boolean;
}

export const View = ({ loading, children, ...props }: ViewProps) => {
  return (
    <>
      <ViewPrimitive
        {...props}
        
        style={[props.style, loading ? { opacity: 0.5 } : {}]}
      >
        {children}
      </ViewPrimitive>

      {loading && (
        <ViewPrimitive 
          {...props}

          style={[props.style, StyleSheet.absoluteFill]}
        >
          <LoadingScreen />
        </ViewPrimitive>
      )}
    </>
  );
};