import React, {useCallback} from 'react';
import {
  Pressable as RNPressable,
  Text as RNText,
  View as RNView,
} from 'react-native';

export type TextProps = RNText['props'];
export type ViewProps = RNView['props'];

type PressableProps = {
  children: React.ReactNode;
  style?: ViewProps['style'];
  activeOpacity?: number;
  [key: string]: any; // Allow any additional props
};

export function CustomPressable({
  children,
  style,
  activeOpacity = 0.75,
  ...otherProps
}: PressableProps) {
  const _style = useCallback(
    ({pressed}: {pressed: boolean}) => [
      {opacity: pressed ? activeOpacity : 1},
      style && style,
    ],
    [style],
  );

  return (
    <RNPressable style={_style} {...otherProps}>
      {children}
    </RNPressable>
  );
}
