import React, {ReactNode, useRef, useState} from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Colors,
  fontSz,
  formatCurrency,
  globalStyles,
  height,
  hp,
  ms,
  width,
  wp,
} from '../../utils';
import {CustomText} from '../../components/Text';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Routes} from '../../routes';
import {
  CreditCardIcon,
  EmailIcon,
  GrowthIcon,
  IdentityCardIcon,
  SendIcon,
  UserIcon,
} from '../../assets/svg';
import {CustomPressable} from '../../components/Button';

const newsAndPromoImage = require('../../assets/img/charachter-add.png');

interface NavProps {
  navigation: NavigationProp<Routes, 'Home'>;
  route: RouteProp<Routes, 'Home'>;
}

// this is the navigation cars on the home screen - consists of type pay for orders, airtime & data etc
export const ChartTypeCard = ({
  type, // the title of the card
  amount, // the amount of the card
  color, // the color of the card
  onPress, // called when the card is pressed
}: {
  amount: string;
  type: string;
  color: string;
  onPress?: () => void;
}) => {
  return (
    <CustomPressable
      onPress={onPress}
      style={[globalStyles.colBetween, styles.chartTypeCardContainer, {}]}>
      <View style={globalStyles.rowStart}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: Colors.transparent,
            },
          ]}
        />
        <CustomText
          style={{
            color: Colors.chartType,
          }}
          fontWeight="400"
          fontSize={fontSz(11)}
          text={type ?? ''}
        />
      </View>
      <View
        style={[
          globalStyles.rowStart,
          {
            paddingTop: ms(3),
          },
        ]}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: color,
            },
          ]}
        />
        <CustomText
          style={{
            color: Colors.chartAmount,
          }}
          fontWeight="700"
          fontSize={fontSz(24)}
          text={amount ?? ''}
        />
      </View>
    </CustomPressable>
  );
};

const HomeNavigationCard = ({
  title, // the title of the card
  onPress, // called when the card is pressed
  icon, // the icon of the card
}: {
  title: string;
  onPress?: () => void;
  icon: ReactNode;
}) => {
  return (
    <CustomPressable
      activeOpacity={0.9}
      onPress={onPress}
      style={[globalStyles.colBetween, styles.navigationCardContainer]}>
      <View style={styles.homeNavigationIconContainer}>{icon ?? icon}</View>
      <CustomText
        style={{
          color: Colors.chartAmount,
          paddingTop: ms(15),
        }}
        fontWeight="400"
        fontSize={fontSz(13)}
        text={title ?? ''}
      />
    </CustomPressable>
  );
};

const VerificationCard = ({
  title, // the title of the card
  text, // the title of the card
  onPress, // called when the card is pressed
  onPressContinue, // called when the card continue button is pressed
  icon, // the icon of the card
  show,
}: {
  title: string;
  text: string;
  onPress?: () => void;
  onPressContinue?: () => void;
  icon: ReactNode;
  show: boolean;
}) => {
  return (
    <CustomPressable
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        globalStyles.rowBetween,
        {
          alignItems: 'flex-start',
          marginVertical: ms(10),
          paddingTop: ms(15),
        },
      ]}>
      <View style={{marginRight: ms(15)}}>{icon ?? icon}</View>
      <View
        style={[
          globalStyles.colBetween,
          {
            flex: 1,
            borderBottomWidth: ms(1),
            borderBottomColor: Colors.divider,
            alignItems: 'flex-start',
          },
        ]}>
        <CustomText
          style={{
            color: Colors.chartAmount,
            paddingBottom: show ? 0 : ms(20),
          }}
          fontWeight="700"
          fontSize={fontSz(14)}
          text={title ?? ''}
        />
        {show && (
          <>
            <CustomText
              style={{
                color: Colors.chartAmount,
                paddingTop: ms(20),
                paddingBottom: ms(20),
              }}
              fontWeight="400"
              fontSize={fontSz(13)}
              text={text ?? ''}
            />
            <CustomPressable activeOpacity={0.9}>
              <CustomText
                style={{
                  color: Colors.primary,
                  paddingBottom: ms(15),
                }}
                fontWeight="700"
                fontSize={fontSz(13)}
                text={'Continue'}
              />
            </CustomPressable>
          </>
        )}
      </View>
    </CustomPressable>
  );
};

const Home = ({route, navigation}: NavProps) => {
  const {navigate, goBack} = navigation;
  const [showVerifyCard, setShowVerifyCard] = useState<string>(
    'Personal Information',
  );

  const getProgress = (percent: number) => {
    return (
      <View
        style={{
          width: `${percent}%`,
          backgroundColor: Colors.primary,
          borderRadius: ms(20),
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bottom,
      }}>
      {/* base scroll view */}
      <ScrollView
        style={[globalStyles.container, {backgroundColor: Colors.bottom}]}
        showsVerticalScrollIndicator={false}>
        {/* this is the top background view component with purple primary color background and contains the header */}
        <View style={styles.contentViewTop}></View>
        {/* this is the bottom background view thats white or transparent */}
        <View style={styles.contentViewBottom}></View>
        <View style={styles.contentView}>
          {/* header */}
          <View style={[globalStyles.rowBetween, {alignItems: 'flex-start'}]}>
            <View style={[globalStyles.rowStart]}>
              <CustomText
                fontSize={fontSz(15)}
                fontWeight="500"
                text={`Hi ${'Philip'} 👋🏾`}
                style={{
                  paddingRight: ms(3),
                  color: Colors.white,
                }}
              />
            </View>
            <CustomPressable
              activeOpacity={1}
              style={{
                width: ms(50),
                height: ms(50),
                position: 'relative',
              }}>
              <FastImage
                style={{width: ms(50), height: ms(50), borderRadius: ms(8)}}
                source={{
                  uri: 'https://unsplash.it/400/400?image=1',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={styles.notification} />
            </CustomPressable>
          </View>
          <CustomText
            fontSize={fontSz(35)}
            fontWeight="700"
            text={`${formatCurrency(7425, '$')}`}
            style={{
              color: Colors.white,
            }}
          />
          <CustomText
            fontSize={fontSz(15)}
            fontWeight="400"
            text={`Available balance`}
            style={{
              color: Colors.white,
              paddingTop: ms(4),
              paddingBottom: ms(20),
            }}
          />
          {/* chart card */}
          <View
            style={[
              globalStyles.colBetween,
              styles.chartTypeWrapper,
              {
                paddingVertical: ms(25),
              },
            ]}>
            <View
              style={[globalStyles.rowBetween, {paddingHorizontal: ms(20)}]}>
              <ChartTypeCard
                amount={`${formatCurrency(1460, '$')}`}
                type={'Spent'}
                color={Colors.debit}
              />
              <ChartTypeCard
                amount={`${formatCurrency(2730, '$')}`}
                type={'Earned'}
                color={Colors.credit}
              />
            </View>
            <View
              style={[
                globalStyles.divider,
                {backgroundColor: Colors.divider, marginVertical: ms(20)},
              ]}
            />
            <View style={[{paddingHorizontal: ms(20)}]}>
              <CustomText
                fontSize={fontSz(13)}
                fontWeight="400"
                text={`You spent $2,732 on dining out this month. This is 25% more than last month.`}
                style={{
                  color: Colors.chartAmount,
                  paddingTop: ms(4),
                  paddingBottom: ms(20),
                  width: '90%',
                }}
              />
              <CustomPressable activeOpacity={0.95}>
                <CustomText
                  fontSize={fontSz(13)}
                  fontWeight="700"
                  text={`Tell me more`}
                  style={{
                    color: Colors.primary,
                    textDecorationLine: 'underline',
                  }}
                />
              </CustomPressable>
            </View>
          </View>
          {/* home navigation / activity cards */}
          <View
            style={{
              marginTop: ms(30),
            }}>
            <CustomText
              fontSize={fontSz(18)}
              fontWeight="700"
              text={`Activity`}
              style={{
                color: Colors.chartAmount,
                paddingBottom: ms(15),
              }}
            />
            <View style={[globalStyles.rowBetween]}>
              <HomeNavigationCard
                title={'Transfer'}
                icon={<SendIcon />}
                onPress={() => navigate('Transfer')}
              />
              <HomeNavigationCard
                title={'My Card'}
                icon={<CreditCardIcon />}
                onPress={() => navigate('FinanceScore')}
              />
              <HomeNavigationCard
                title={'Insight'}
                icon={<GrowthIcon />}
                onPress={() => navigate('Details')}
              />
            </View>
          </View>
          {/* verification card */}
          <View
            style={{
              marginTop: ms(30),
            }}>
            <CustomText
              fontSize={fontSz(18)}
              fontWeight="700"
              text={`Complete Verification`}
              style={{
                color: Colors.chartAmount,
                paddingBottom: ms(15),
              }}
            />
            <View
              style={[
                globalStyles.colBetween,
                styles.chartTypeWrapper,
                {
                  paddingVertical: ms(25),
                  paddingHorizontal: ms(20),
                },
              ]}>
              {/* % progress header */}
              <View style={globalStyles.rowBetween}>
                <CustomText
                  fontSize={fontSz(25)}
                  fontWeight="700"
                  text={`${75}%`}
                  style={{
                    color: Colors.chartAmount,
                    paddingBottom: ms(15),
                  }}
                />
                <CustomText
                  fontSize={fontSz(12)}
                  fontWeight="400"
                  text={`${7} of ${10} completed`}
                  style={{
                    color: Colors.chartAmount,
                    paddingBottom: ms(15),
                  }}
                />
              </View>
              {/* progress */}
              <View
                style={{
                  backgroundColor: Colors.progressBg,
                  width: '100%',
                  height: ms(10),
                  borderRadius: ms(20),
                  position: 'relative',
                  marginTop: ms(7.5),
                }}>
                {getProgress(75)}
              </View>
              <View
                style={[
                  globalStyles.divider,
                  {
                    backgroundColor: Colors.dividerDeep,
                    marginTop: ms(30),
                    marginBottom: ms(15),
                    opacity: 0.5,
                  },
                ]}
              />
              <VerificationCard
                title={'Personal Information'}
                text={
                  'Please provide documents to verify your source of income personal informmation.'
                }
                icon={<UserIcon />}
                onPress={() => setShowVerifyCard('Personal Information')}
                show={showVerifyCard === 'Personal Information'}
              />
              <VerificationCard
                title={'Verification'}
                text={
                  'Please provide documents to verify your source of income personal informmation.'
                }
                icon={<IdentityCardIcon />}
                onPress={() => setShowVerifyCard('Verification')}
                show={showVerifyCard === 'Verification'}
              />
              <VerificationCard
                title={'Confirm email'}
                text={
                  'Please provide documents to verify your source of income personal informmation.'
                }
                icon={<EmailIcon />}
                onPress={() => setShowVerifyCard('Confirm email')}
                show={showVerifyCard === 'Confirm email'}
              />
            </View>
          </View>
          {/* news and promo card */}
          <View
            style={{
              marginTop: ms(30),
            }}>
            <CustomText
              fontSize={fontSz(18)}
              fontWeight="700"
              text={`News and promo`}
              style={{
                color: Colors.chartAmount,
                paddingBottom: ms(15),
              }}
            />
            <View
              style={[
                globalStyles.colBetween,
                styles.chartTypeWrapper,
                {
                  height: ms(310),
                },
              ]}>
              <FastImage
                style={{
                  width: '100%',
                  height: ms(155),
                  borderTopLeftRadius: ms(8),
                  borderTopRightRadius: ms(8),
                }}
                source={newsAndPromoImage}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  paddingHorizontal: ms(20),
                  paddingVertical: ms(25),
                }}>
                <CustomText
                  fontSize={fontSz(15)}
                  fontWeight="700"
                  text={`Invite your friends!`}
                  style={{
                    color: Colors.chartAmount,
                  }}
                />
                <CustomText
                  fontSize={fontSz(13)}
                  fontWeight="400"
                  text={`For every user you invite and signs up, you can earn up $5.`}
                  style={{
                    color: Colors.chartAmount,
                  }}
                />
                <CustomPressable activeOpacity={0.95}>
                  <CustomText
                    fontSize={fontSz(15)}
                    fontWeight="700"
                    text={`Invite Now`}
                    style={{
                      color: Colors.primary,
                    }}
                  />
                </CustomPressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* status bar */}
      <StatusBar
        backgroundColor={Colors.primary}
        barStyle={'light-content'}
        animated={true}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  contentViewTop: {
    height: '20.5%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
  },
  contentViewBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.bottom,
  },
  contentView: {
    flex: 1,
    alignSelf: 'center',
    width: width,
    backgroundColor: Colors.transparent,
    paddingHorizontal: ms(30),
    paddingVertical: Platform.OS === 'ios' ? height / hp(16) : hp(24),
  },
  notification: {
    height: ms(14),
    width: ms(14),
    borderRadius: ms(14 / 2),
    position: 'absolute',
    bottom: ms(-2.5),
    left: ms(-2.5),
    backgroundColor: Colors.primary,
    borderWidth: ms(2.5),
    borderColor: Colors.white,
  },
  chartTypeWrapper: {
    width: '100%',
    borderRadius: ms(8),
    backgroundColor: Colors.white,
    borderWidth: ms(0.025),
    borderColor: Colors.divider,
  },
  chartTypeCardContainer: {
    flex: 1,
  },
  dot: {
    height: ms(10),
    width: ms(10),
    borderRadius: ms(10 / 2),
    marginRight: ms(12.5),
  },
  navigationCardContainer: {
    alignItems: 'center',
    width: '30%',
    // height: hp(60),
    borderRadius: ms(8),
    paddingVertical: ms(15),
    borderWidth: ms(0.025),
    backgroundColor: Colors.white,
    borderColor: Colors.divider,
  },
  homeNavigationIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(40),
    width: ms(40),
    borderRadius: ms(8),
    backgroundColor: Colors.primary,
  },
});
