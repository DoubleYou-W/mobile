import { Text } from "@/components/ui/text/text";
import { View, ViewProps } from "@/components/ui/view/view";

export type DotListOptionProps = ViewProps & {};

export const DotListOption = ({
  children,
  ...props
}: DotListOptionProps) => {

  return (
    <View className="flex-row gap-2">
      <Text variant="info">•</Text>
      <Text variant="info">{children}</Text>
    </View>
  )
}
