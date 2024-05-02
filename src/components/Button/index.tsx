import React, {memo, ComponentProps, useCallback} from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  Button as RNButton,
  TextStyle,
  View,
  Pressable as RNPressable,
  Text as RNText,
  View as RNView,
  ActivityIndicator,
} from 'react-native';
import {Colors, fontSz, hp, ms} from '../../utils';
import {CustomText} from '../Text';

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
  activeOpacity,
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

type ButtonProps = ComponentProps<typeof RNButton> & {
  title: string;
  isLoading?: boolean;
  loaderColor?: string;
  outlined?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fontSize?: number;
  prependComponent?: any;
  appendComponent?: any;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export const Button = memo(
  ({
    title,
    loaderColor = Colors.white,
    isLoading = false,
    outlined,
    style,
    textStyle = {
      fontSize: fontSz(16),
      fontWeight: '500',
      color: Colors.white,
    },
    fontWeight = '500',
    fontSize = fontSz(16),
    containerStyle,
    prependComponent,
    appendComponent,
    disabled = false,
    ...rest
  }: ButtonProps) => {
    return (
      <CustomPressable
        activeOpacity={0.9}
        disabled={disabled || isLoading}
        style={[
          styles.btn,
          {
            backgroundColor: disabled ? Colors.divider : Colors.primary,
            opacity: disabled && outlined ? 0.5 : 1,
          },
          style,
        ]}
        {...rest}>
        {!isLoading ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {prependComponent}
            <CustomText
              text={title}
              fontSize={fontSize}
              color={Colors.white}
              fontWeight={fontWeight}
              style={textStyle}
            />
            {appendComponent}
          </View>
        ) : (
          <ActivityIndicator size={'small'} color={loaderColor} />
        )}
      </CustomPressable>
    );
  },
);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: ms(8),
    width: '100%',
    height: hp(54),
    marginTop: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
