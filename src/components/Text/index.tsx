import React, {ComponentProps, ReactNode, memo, useMemo} from 'react';
import {StyleProp, TextStyle, Text as BaseText} from 'react-native';
import {Colors, fontSz} from '../../utils';

type TextProps = ComponentProps<typeof BaseText> & {
  text: string | ReactNode;
  fontSize?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  color?: string;
  fontFamily?:
    | 'Satoshi-Black'
    | 'Satoshi-Bold'
    | 'Satoshi-ExtraLight'
    | 'Satoshi-Light'
    | 'Satoshi-Medium'
    | 'Satoshi-Regular'
    | 'Satoshi-SemiBold'
    | 'Satoshi-Thin';
  lineHeight?: number;
  numberOfLines?: number;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined;
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
  style?: StyleProp<TextStyle>;
};

export const CustomText = memo(
  ({
    text,
    fontSize = fontSz(15),
    lineHeight,
    numberOfLines = 0,
    onPress,
    textAlign,
    color,
    fontWeight = '400',
    fontFamily = 'Satoshi-Regular',
    textDecorationLine = 'none',
    style,
    ...rest
  }: TextProps) => {
    const propsStyle = useMemo(
      () => ({
        color: Colors.textColor,
        fontSize,
        textAlign,
        lineHeight,
        fontWeight,
        fontFamily,
        textDecorationLine,
      }),
      [
        color,
        textAlign,
        textDecorationLine,
        fontWeight,
        fontFamily,
        lineHeight,
        fontSize,
      ],
    );

    return (
      <BaseText
        numberOfLines={numberOfLines}
        onPress={onPress}
        style={[propsStyle, style]}
        {...rest}>
        {text}
      </BaseText>
    );
  },
);
