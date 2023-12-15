import React, {memo, ComponentProps, ReactNode} from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  Button as RNButton,
  TextStyle,
  View,
} from 'react-native';
import {Flow} from 'react-native-animated-spinkit';
import {Colors, fontSz, hp, wp} from '../../utils';
import {CustomText} from '../Text';
import {CustomPressable} from '../Pressable';

type ButtonProps = ComponentProps<typeof RNButton> & {
  title: string;
  isLoading?: boolean;
  loaderColor?: string;
  outlined?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fontSize?: number;
  prependComponent?: ReactNode;
  appendComponent?: ReactNode;
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
};

export const Button = memo(
  ({
    title,
    loaderColor = Colors.white,
    isLoading = false,
    outlined,
    style,
    textStyle = {
      color: Colors.white,
    },
    fontWeight = 'bold',
    fontSize = fontSz(14),
    containerStyle,
    prependComponent,
    appendComponent,
    ...rest
  }: ButtonProps) => {
    return (
      <CustomPressable
        disabled={isLoading}
        style={[
          styles.btn,
          {
            backgroundColor: Colors.primary,
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
          <Flow size={wp(75)} color={Colors.white} />
        )}
      </CustomPressable>
    );
  },
);

const styles = StyleSheet.create({
  btn: {
    borderRadius: fontSz(100),
    width: '100%',
    height: hp(40),
    marginTop: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
