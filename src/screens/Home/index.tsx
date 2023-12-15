import React, {ReactNode, useRef, useState} from 'react';
import {FlatList, Platform, StatusBar, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Colors,
  fontSz,
  formatCurrency,
  globalStyles,
  hp,
  width,
  wp,
} from '../../utils';
import {CustomText} from '../../components/Text';
import Header from '../../components/Header';
import ToggleTabs from '../../components/ToggleTab';
import TransactionCard from '../../components/TransactionCard';
import {CustomPressable} from '../../components/Pressable';
import {
  AddMoneyIcon,
  AirtimeDataIcon,
  ChatIcon,
  PayBillsIcon,
  PayForOrdersIcon,
  PosIcon,
  QrIcon,
  SettingsIcon,
  TransferMoneyIcon,
} from '../../assets/svg';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Routes} from '../../routes';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  filteredTransactionsState,
  transactionFilterState,
} from '../../recoil/atoms/accountTransactions';
import {walletAmountState} from '../../recoil/atoms/money';

const walletCardImage = require('../../assets/img/wallet_card.png');

interface NavProps {
  navigation: NavigationProp<Routes, 'Home'>;
  route: RouteProp<Routes, 'Home'>;
}

// this is the navigation cars on the home screen - consists of type pay for orders, airtime & data etc
const HomeNavigationCard = ({
  title, // the title of the card
  backgroundColor, // the background color of the card
  onPress, // called when the card is pressed
  icon, // the icon of the card
}: {
  title: string;
  backgroundColor: string;
  onPress?: () => void;
  icon: ReactNode;
}) => {
  return (
    <CustomPressable
      onPress={onPress}
      style={[
        globalStyles.colBetween,
        styles.navigationCardContainer,
        {
          backgroundColor: backgroundColor,
        },
      ]}>
      {icon ?? icon}
      <CustomText
        style={{
          color: Colors.textColor,
        }}
        fontWeight="500"
        fontSize={fontSz(11)}
        text={title ?? ''}
      />
    </CustomPressable>
  );
};

const Home = ({route, navigation}: NavProps) => {
  const {navigate, goBack} = navigation;
  const [tabRoute, setTabRoute] = useState<0 | 1 | 2>(0);
  const [transactionFilter, setTransactionFilter] = useRecoilState(
    transactionFilterState,
  );
  const [walletAmount, setWalletAmount] = useRecoilState(walletAmountState);
  const filteredTransactions = useRecoilValue(filteredTransactionsState);
  const listRef = useRef<FlatList>(null);

  const handleToggle = (tab: number) => {
    switch (tab) {
      case 0:
        setTransactionFilter('');
        return;
      case 1:
        setTransactionFilter('credit');
        return;
      case 2:
        setTransactionFilter('debit');
        return;
      default:
        break;
    }
  };
  return (
    <View style={globalStyles.container}>
      {/* this is the top background view component with purple primary color background and contains the header */}
      <View style={styles.contentViewTop}>
        <Header headerTitle={'Wallet'} disabled={true} />
      </View>
      {/* this is the bottom background view thats white or transparent */}
      <View style={styles.contentViewBottom}></View>
      {/* this is the content widget containing the main content of the screen */}
      <View
        style={[
          styles.contentView,
          globalStyles.shadowProp,
          globalStyles.shadowElevation,
        ]}>
        {/* wallet card */}
        <View
          style={{
            alignItems: 'center',
            position: 'relative',
          }}>
          {/* <WalletCard /> */}
          <FastImage // a png file is been used because the svg file from the figma design isnt parsing
            style={styles.walletCardImage}
            source={walletCardImage}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.walletCardOverlay}>
            <View
              style={[
                globalStyles.colBetween,
                {
                  flex: 0.7,
                  alignSelf: 'center',
                },
              ]}>
              <CustomText
                style={{
                  color: Colors.white,
                }}
                fontWeight="400"
                textAlign={'center'}
                fontSize={fontSz(16)}
                text={`Account Balance`}
              />
              <CustomText
                style={{
                  color: Colors.white,
                }}
                fontWeight="500"
                textAlign={'center'}
                fontSize={fontSz(26)}
                text={formatCurrency(walletAmount)}
              />
            </View>
            <View
              style={[
                globalStyles.rowBetween,
                {
                  paddingTop: hp(10),
                  borderTopColor: Colors.white,
                  borderTopWidth: fontSz(1),
                },
              ]}>
              <CustomPressable
                onPress={() => {
                  navigate('AddMoney');
                }}
                style={[
                  globalStyles.rowStart,
                  {
                    flex: 1,
                    alignItems: 'flex-start',
                  },
                ]}>
                <AddMoneyIcon color={Colors.white} />
                <CustomText
                  style={{
                    color: Colors.white,
                    paddingHorizontal: wp(15),
                  }}
                  fontWeight="500"
                  fontSize={fontSz(14)}
                  text={`Add Money`}
                />
              </CustomPressable>
              <CustomPressable
                style={[
                  globalStyles.rowEnd,
                  {
                    flex: 1,
                  },
                ]}>
                <QrIcon />
                <CustomText
                  style={{
                    color: Colors.white,
                    paddingHorizontal: wp(15),
                  }}
                  fontWeight="500"
                  fontSize={fontSz(14)}
                  text={`Show QR Code`}
                />
              </CustomPressable>
            </View>
          </View>
        </View>
        {/* navigation helper */}
        <View
          style={[
            globalStyles.rowBetween,
            {
              flexWrap: 'wrap',
              paddingBottom: hp(15),
            },
          ]}>
          <HomeNavigationCard
            icon={
              <PayForOrdersIcon
                color={Colors.textColor}
                style={{
                  paddingVertical: hp(10),
                }}
              />
            }
            title={`Pay for Orders`}
            backgroundColor={Colors.payForOrders}
          />
          <HomeNavigationCard
            icon={
              <AirtimeDataIcon
                color={Colors.textColor}
                style={{
                  paddingVertical: hp(10),
                }}
              />
            }
            title={`Airtime & Data`}
            backgroundColor={Colors.airtimeAndData}
          />
          <HomeNavigationCard
            icon={
              <TransferMoneyIcon
                color={Colors.textColor}
                style={{
                  paddingVertical: hp(10),
                }}
              />
            }
            title={`Transfer Money`}
            backgroundColor={Colors.transferMoney}
          />
          <HomeNavigationCard
            icon={
              <PayBillsIcon
                color={Colors.textColor}
                style={{
                  paddingVertical: hp(10),
                }}
              />
            }
            title={`Pay Bills`}
            backgroundColor={Colors.payBills}
          />
          <HomeNavigationCard
            icon={
              <PosIcon
                color={Colors.textColor}
                style={{
                  paddingVertical: hp(10),
                }}
              />
            }
            title={`POS`}
            backgroundColor={Colors.pos}
          />
          <HomeNavigationCard
            icon={
              <SettingsIcon
                color={Colors.textColor}
                style={{
                  paddingVertical: hp(10),
                }}
              />
            }
            title={`Settings`}
            backgroundColor={Colors.settings}
          />
        </View>
        {/* transactions header */}
        <View
          style={[
            globalStyles.rowBetween,
            {
              paddingVertical: hp(10),
            },
          ]}>
          <CustomText
            style={{
              color: Colors.textColorDeep,
            }}
            fontWeight="500"
            fontSize={fontSz(16)}
            text={`Account Transactions`}
          />
          <CustomPressable>
            <CustomText
              style={{
                color: Colors.primary,
              }}
              fontWeight="500"
              fontSize={fontSz(14)}
              text={`View More`}
            />
          </CustomPressable>
        </View>
        {/* tab navigation */}
        <ToggleTabs
          selectedTab={(e: React.SetStateAction<0 | 1 | 2>) => {
            setTabRoute(e);
            handleToggle(Number(e));
          }}
          currentTab={tabRoute}
          firstLabel={'Both'}
          secondLabel={'In'}
          thirdLabel={'Out'}
        />
        <FlatList
          ref={listRef}
          showsVerticalScrollIndicator={false}
          data={filteredTransactions}
          initialNumToRender={4}
          ListHeaderComponent={
            <CustomText
              style={{
                paddingTop: hp(7.5),
                paddingVertical: hp(2.5),
              }}
              fontWeight="400"
              fontSize={fontSz(14)}
              text={`Today`}
            />
          }
          renderItem={({item, index}) => {
            return (
              <TransactionCard
                key={index}
                status={item?.status}
                title={item?.title}
                transactionType={item?.transactionType}
              />
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
        <CustomPressable
          style={{
            position: 'absolute',
            bottom: -15,
            right: 10,
          }}>
          <ChatIcon />
        </CustomPressable>
      </View>

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
    height: '31.77%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderBottomStartRadius: fontSz(20),
    borderBottomEndRadius: fontSz(20),
  },
  contentViewBottom: {
    height: '69.23%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.transparent,
  },
  contentView: {
    alignSelf: 'center',
    marginTop: hp(50),
    height: Platform.select({
      ios: '85.47%',
      android: '85.47%',
      default: '85.47%',
    }),
    width: width - fontSz(40),
    borderRadius: fontSz(22),
    backgroundColor: Colors.white,
    paddingHorizontal: fontSz(15),
  },
  navigationCardContainer: {
    alignItems: 'center',
    width: '30%',
    height: hp(60),
    borderRadius: fontSz(4),
    marginVertical: hp(6),
    paddingVertical: hp(10),
  },
  walletCardImage: {
    width: Platform.OS === 'ios' ? fontSz(375) : '100%',
    height: Platform.select({
      ios: fontSz(240),
      android: fontSz(250),
      default: fontSz(240),
    }),
    borderRadius: 8,
  },
  walletCardOverlay: {
    width: '100%',
    height: '100%',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: fontSz(15),
    paddingVertical: hp(45),
    paddingBottom: hp(50),
    position: 'absolute',
    // backgroundColor: 'rgba(5, 5, 7, 0.5)',
  },
});
