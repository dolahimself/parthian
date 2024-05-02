import React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Routes} from '../../routes';
import {
  Colors,
  fontSz,
  formatAsCurrency,
  globalStyles,
  height,
  hp,
  ms,
} from '../../utils';
import {CustomText} from '../../components/Text';
import {BurgerIcon, ReceiptIllustrationIcon} from '../../assets/svg';
import {Button, CustomPressable} from '../../components/Button';

interface NavProps {
  navigation: NavigationProp<Routes, 'Receipt'>;
  route: RouteProp<Routes, 'Receipt'>;
}

const ContactCard = ({
  title, // the title of the card
  name, // the name of the card
  onPress, // called when the card is pressed
  icon, // the icon of the card
}: {
  title: string;
  name: string;
  onPress?: () => void;
  icon: string;
}) => {
  return (
    <CustomPressable
      activeOpacity={0.9}
      onPress={onPress}
      style={[globalStyles.rowBetween, styles.contactCard]}>
      <FastImage
        style={{width: ms(50), height: ms(50), borderRadius: ms(10)}}
        source={{
          uri: icon,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View
        style={[
          globalStyles.colBetween,
          {
            flex: 1,
            paddingLeft: ms(12.5),
          },
        ]}>
        <CustomText
          style={{
            color: Colors.recommendationHeader,
            paddingTop: ms(5),
          }}
          fontWeight="700"
          fontSize={fontSz(12)}
          text={name ?? ''}
        />
        <CustomText
          style={{
            color: Colors.chartAmount,
            paddingTop: ms(5),
          }}
          fontWeight="700"
          fontSize={fontSz(15)}
          text={title ?? ''}
        />
      </View>
    </CustomPressable>
  );
};

const ReceiptCard = ({
  title, // the title of the card
  name, // the name of the card
  style,
}: {
  title: string;
  name: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[globalStyles.colBetween, style]}>
      <CustomText
        style={{
          color: Colors.recommendationHeader,
          paddingTop: ms(5),
        }}
        fontWeight="700"
        fontSize={fontSz(12)}
        text={title ?? ''}
      />
      <CustomText
        style={{
          color: Colors.chartAmount,
          paddingTop: ms(3.5),
        }}
        fontWeight="700"
        fontSize={fontSz(15)}
        text={name ?? ''}
      />
    </View>
  );
};

const Receipt = ({route, navigation}: NavProps) => {
  const {goBack, navigate} = navigation;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: Platform.OS === 'ios' ? height / hp(16) : hp(24),
        position: 'relative',
      }}>
      <View
        style={{
          position: 'absolute',
          top: Platform.OS === 'ios' ? height / hp(16) : hp(24),
          left: 0,
          right: 0,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <ReceiptIllustrationIcon />
      </View>
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: ms(30),
        }}>
        <CustomText
          fontSize={fontSz(20)}
          fontWeight="700"
          text={`My Receipt`}
          style={{
            color: Colors.white,
            paddingTop: ms(50),
          }}
          textAlign={'center'}
        />
        {/* receipt */}
        <View style={[globalStyles.colBetween, styles.receiptContainer]}>
          <View style={[globalStyles.colBetween, {alignItems: 'center'}]}>
            <View
              style={[
                globalStyles.rowCenter,
                {
                  height: ms(75),
                  width: ms(75),
                  borderRadius: ms(22),
                  backgroundColor: Colors.yellow,
                },
              ]}>
              <BurgerIcon />
            </View>
            <CustomText
              fontSize={fontSz(20)}
              fontWeight="700"
              text={`Transfer complete.`}
              style={{
                color: Colors.chartAmount,
                paddingTop: ms(15),
              }}
              textAlign={'center'}
            />
          </View>
          <View style={[globalStyles.rowBetween, {marginVertical: ms(10)}]}>
            <View style={styles.semicircle} />
            <View style={styles.divider} />
            <View style={styles.invertSemicircle} />
          </View>
          <View style={[globalStyles.colBetween, styles.receiptBottom]}>
            <ContactCard
              title={'Recipient'}
              name={'Hailey Sanders'}
              icon={'https://unsplash.it/400/400?image=1'}
            />
            <View
              style={[
                globalStyles.colBetween,
                {
                  flex: 1,
                  marginVertical: ms(42.5),
                },
              ]}>
              <ReceiptCard title={'Reference number'} name={'#D79004321786'} />
              <View style={[globalStyles.rowBetween]}>
                <ReceiptCard
                  title={'Amount sent'}
                  name={formatAsCurrency(46.09)}
                  style={{flex: 1}}
                />
                <ReceiptCard
                  title={'Transfer fee'}
                  name={formatAsCurrency(0.0)}
                  style={{flex: 1}}
                />
              </View>
            </View>
            <Button
              title={'Share'}
              onPress={() => {
                goBack();
              }}
              style={{
                alignSelf: 'center',
                width: '80%',
              }}
            />
          </View>
        </View>
        <CustomText
          fontSize={fontSz(16)}
          fontWeight="700"
          text={`Your transfer will arrive to the recipient within 48 hours`}
          style={{
            color: Colors.white,
            width: '90%',
          }}
          textAlign={'center'}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  receiptContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: ms(8),
    marginVertical: ms(40),
    paddingVertical: ms(20),
  },
  semicircle: {
    width: ms(17.5),
    height: ms(35),
    borderTopRightRadius: ms(35 / 2),
    borderEndEndRadius: ms(35 / 2),
    backgroundColor: Colors.primary,
    overflow: 'hidden',
  },
  invertSemicircle: {
    width: ms(17.5),
    height: ms(35),
    borderBottomLeftRadius: ms(35 / 2),
    borderStartStartRadius: ms(35 / 2),
    backgroundColor: Colors.primary,
    overflow: 'hidden',
  },
  divider: {
    width: '82.50%',
    borderStyle: 'dashed',
    borderWidth: ms(1.5),
    borderColor: Colors.dashDivider,
  },
  receiptBottom: {
    flex: 1,
    paddingHorizontal: ms(30),
  },
  contactCard: {
    paddingVertical: ms(12.5),
    borderRadius: ms(8),
    marginVertical: ms(7.5),
    backgroundColor: Colors.white,
  },
});
