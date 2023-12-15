import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {fontSz, globalStyles, hp, wp, Colors} from '../../utils';
import {CustomPressable} from '../Pressable';
import {CustomText} from '../Text';
import {BackArrowIcon} from '../../assets/svg';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  headerTitle,
  headerColor,
  showBorder,
  disabled,
}: {
  headerTitle: string;
  headerColor?: string;
  showBorder?: boolean;
  disabled?: boolean;
}) => {
  const navigation = useNavigation();
  const {goBack} = navigation;

  return (
    <View
      style={[
        globalStyles.rowBetween,
        styles.container,
        showBorder && styles.border,
      ]}>
      <CustomPressable
        onPress={() => {
          if (disabled) {
            return;
          } else {
            goBack();
          }
        }}
        style={[
          globalStyles.rowStart,
          {
            flex: 1,
            alignItems: 'flex-start',
          },
        ]}>
        <BackArrowIcon
          color={headerColor ? headerColor : Colors.headerWhiteText}
          style={{
            alignItems: 'center',
          }}
        />
      </CustomPressable>
      <View
        style={[
          globalStyles.rowCenter,
          {
            flex: 1,
          },
        ]}>
        <CustomText
          fontWeight="500"
          style={{
            color: headerColor ? headerColor : Colors.headerWhiteText,
          }}
          fontSize={fontSz(18)}
          text={headerTitle ?? ''}
        />
      </View>
      <View
        style={[
          globalStyles.rowEnd,
          {
            flex: 1,
          },
        ]}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.select({
      ios: hp(40),
      android: hp(10),
      default: hp(10), // Handle other platforms or set a default value
    }),
    paddingBottom: hp(10),
    paddingHorizontal: wp(40),
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabBackground,
  },
});
