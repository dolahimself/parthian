import React from 'react';
import {Text as BaseText, TextInput, View} from 'react-native';
import {Colors, fontSz, hp, ms} from '../../utils';
import {CustomText} from '../Text';

const Input = (props: {
  containerStyle?: any;
  value: any;
  placeholder: any;
  inputStyle?: any;
  prependComponent?: any;
  appendComponent?: any;
  onChange?: any;
  onEndEditing?: any;
  onFocus?: any;
  secureTextEntry?: any;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | undefined;
  autoCompleteType?:
    | 'off'
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'gender'
    | 'name'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'postal-code'
    | 'street-address'
    | 'sms-otp'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-device'
    | 'username'
    | 'username-new'
    | 'off'
    | undefined;
  autoCapitalize?: 'none' | undefined;
  errorMsg?: string | undefined;
  multiline?: boolean | undefined;
  numberOfLines?: number;
  isLoading?: boolean;
  returnKeyLabel?: string;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  editable?: boolean;
}) => {
  const {
    value,
    containerStyle,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onChange,
    onEndEditing,
    onFocus,
    secureTextEntry,
    keyboardType = 'default',
    autoCompleteType = 'off',
    autoCapitalize = 'none',
    errorMsg = '',
    multiline = false,
    numberOfLines = 1,
    isLoading = false,
    returnKeyLabel,
    returnKeyType,
    editable = true,
  } = props;
  return (
    <View
      style={{position: 'relative', paddingBottom: ms(8), ...containerStyle}}>
      {/* Text Input */}
      <View
        style={{
          flexDirection: 'row',
          height: hp(55),
          paddingHorizontal: ms(14),
          marginTop: ms(4),
          borderRadius: ms(8),
          borderColor: errorMsg.length > 0 ? Colors.debit : '#F4F4F4',
          borderWidth: ms(1),
          backgroundColor: '#F4F4F4',
        }}>
        {prependComponent}

        <TextInput
          style={{
            flex: 1,
            ...inputStyle,
            color: Colors.chartAmount,
            fontWeight: '700',
            opacity: editable ? 1 : 0.5,
          }}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={'rgba(158, 166, 190, 1)'}
          onChangeText={text => onChange(text)}
          onEndEditing={text => onEndEditing(text)}
          onFocus={text => onFocus()}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoComplete={autoCompleteType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          returnKeyLabel={returnKeyLabel}
          returnKeyType={returnKeyType}
          editable={editable}
        />

        {appendComponent}
      </View>
      {/* error message */}
      <CustomText
        style={{
          // paddingTop: ms(2.5),
          position: 'absolute',
          bottom: ms(-10),
          left: 0,
        }}
        fontSize={fontSz(14)}
        fontWeight="400"
        text={`${errorMsg}`}
        color={Colors.debit}
      />
    </View>
  );
};

export default Input;
