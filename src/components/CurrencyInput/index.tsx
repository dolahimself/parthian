import React, {
  forwardRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import formatNumber from '../../utils/formatNumber';
import Input from '../Input';
import {View} from 'react-native';
import {Colors, fontSz, hp, naira, wp} from '../../utils';
import {CustomPressable} from '../Pressable';
import {CustomText} from '../Text';

interface CurrencyInputProps {
  value: number | null;
  onChangeText?: (text: string) => void;
  onChangeValue?: (value: number | React.SetStateAction<string> | null) => void;
  separator: string;
  delimiter: string;
  unit?: string;
  precision?: number;
  maxValue?: number;
  minValue?: number;
  ignoreNegative?: boolean;
  containerStyle?: any;
}

const CurrencyInput: React.ForwardRefRenderFunction<any, CurrencyInputProps> = (
  props,
  ref,
) => {
  const {
    value,
    onChangeText,
    onChangeValue,
    separator,
    delimiter,
    unit = '',
    precision = 2,
    maxValue,
    minValue,
    ignoreNegative,
    containerStyle,
    ...rest
  } = props;

  const [startNegative, setStartNegative] = useState<boolean>(false);
  const [amountError, setAmountError] = useState<string>('');

  const formattedValue = useMemo(() => {
    if (!!value || value === 0 || value === -0) {
      return formatNumber(value as number, {
        separator,
        unit,
        precision,
        delimiter,
        ignoreNegative: !!ignoreNegative,
      });
    } else {
      return '';
    }
  }, [delimiter, ignoreNegative, precision, separator, unit, value]);

  useEffect(() => {
    onChangeText && onChangeText(formattedValue);
  }, [formattedValue]);

  const handleChangeText = useCallback(
    (text: string) => {
      const textWithoutUnit = text.replace(unit, '');

      if (/^(-|-0)$/.test(textWithoutUnit) && !ignoreNegative) {
        setStartNegative(true);
        onChangeText && onChangeText(unit + '-');
        return;
      } else {
        setStartNegative(false);
      }

      const negative = textWithoutUnit.charAt(0) === '-';
      const textNumericValue = text.replace(/\D+/g, '');
      const numberValue = Number(textNumericValue) * (negative ? -1 : 1);
      const zerosOnValue = textNumericValue.replace(/[^0]/g, '').length;
      let newValue;

      if (!textNumericValue || (!numberValue && zerosOnValue === precision)) {
        newValue = null;
      } else {
        newValue = numberValue / 10 ** precision;
      }

      if (newValue && maxValue && newValue > maxValue) {
        return;
      } else if (newValue && minValue && newValue < minValue) {
        return;
      }

      onChangeValue && onChangeValue(newValue);
    },
    [
      unit,
      ignoreNegative,
      precision,
      maxValue,
      minValue,
      onChangeValue,
      onChangeText,
    ],
  );

  return (
    <Input
      placeholder="Enter Amount"
      value={startNegative ? unit + '-' : formattedValue}
      onChange={handleChangeText}
      keyboardType="numeric"
      label={'Amount'}
      errorMsg={amountError}
      containerStyle={[{marginVertical: hp(15)}, containerStyle]}
      onEndEditing={() => {}}
      onFocus={() => {}}
      prependComponent={
        <View
          style={{
            justifyContent: 'center',
            marginLeft: wp(10),
            marginRight: wp(20),
          }}>
          <CustomPressable>
            <CustomText
              style={{
                color: Colors.inputText,
              }}
              fontWeight="500"
              fontSize={fontSz(14)}
              text={naira}
            />
          </CustomPressable>
        </View>
      }
      {...rest}
    />
  );
};

export default forwardRef(CurrencyInput);
