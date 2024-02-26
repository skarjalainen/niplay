import { useCallback } from "react";
import { Pressable, PressableProps, PressableStateCallbackType, StyleProp, Text, ViewStyle } from "react-native";
import { baseStyles } from "../styles";

export default ({ children, style, ...props }: PressableProps) => {

  const getStyle = useCallback((state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    const incommingStyle = typeof style === "function" ? style(state) : style;
    return [
      baseStyles.button,
      state.pressed && baseStyles.buttonPressed,
      incommingStyle,
    ]
  }, [style])

  return (
    <Pressable style={getStyle} {...props}>
      {children}
    </Pressable>
  );
};
