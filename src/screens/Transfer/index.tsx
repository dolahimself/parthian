import React, {useRef, useState} from 'react';
import {FlatList, Image, Platform, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import {
  Colors,
  contacts,
  fontSz,
  globalStyles,
  height,
  hp,
  ms,
} from '../../utils';
import {CustomText} from '../../components/Text';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Routes} from '../../routes';
import Input from '../../components/Input';
import {SearchIcon} from '../../assets/svg';
import {CustomPressable} from '../../components/Button';

interface NavProps {
  navigation: NavigationProp<Routes, 'Transfer'>;
  route: RouteProp<Routes, 'Transfer'>;
}

const mobileIcon = require('../../assets/img/mobile.png');
const bankIcon = require('../../assets/img/bank.png');
const onlineIcon = require('../../assets/img/online.png');
const qrIcon = require('../../assets/img/qr-code.png');

const RecentCard = ({
  title, // the title of the card
  number, // the number of the card
  onPress, // called when the card is pressed
  icon, // the icon of the card
}: {
  title: string;
  number: string;
  onPress?: () => void;
  icon: string;
}) => {
  return (
    <CustomPressable
      activeOpacity={0.9}
      onPress={onPress}
      style={[globalStyles.colBetween, styles.navigationCardContainer]}>
      <FastImage
        style={{width: ms(70), height: ms(70), borderRadius: ms(20)}}
        source={{
          uri: icon,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={{alignItems: 'center', paddingTop: ms(15)}}>
        <CustomText
          style={{
            color: Colors.chartAmount,
          }}
          fontWeight="700"
          fontSize={fontSz(13)}
          text={title ?? ''}
        />
        <CustomText
          style={{
            color: Colors.recommendationHeader,
            paddingTop: ms(5),
          }}
          fontWeight="700"
          fontSize={fontSz(12)}
          text={number ?? ''}
        />
      </View>
    </CustomPressable>
  );
};

const ContactCard = ({
  title, // the title of the card
  number, // the number of the card
  onPress, // called when the card is pressed
  icon, // the icon of the card
  onPressInvite,
  showInvite,
}: {
  title: string;
  number: string;
  onPress?: () => void;
  onPressInvite?: () => void;
  icon: string;
  showInvite: boolean;
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
            color: Colors.chartAmount,
          }}
          fontWeight="700"
          fontSize={fontSz(15)}
          text={title ?? ''}
        />
        <CustomText
          style={{
            color: Colors.recommendationHeader,
            paddingTop: ms(5),
          }}
          fontWeight="700"
          fontSize={fontSz(12)}
          text={number ?? ''}
        />
      </View>
      {showInvite && (
        <CustomPressable
          activeOpacity={0.9}
          onPress={onPressInvite}
          style={{
            flex: 0.45,
            borderRadius: ms(4),
            backgroundColor: Colors.recommendationHeader,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: ms(12.5),
          }}>
          <CustomText
            style={{
              color: Colors.white,
            }}
            fontWeight="700"
            fontSize={fontSz(12)}
            text={'invite'}
          />
        </CustomPressable>
      )}
      {!showInvite && (
        <View
          style={{
            flex: 0.45,
          }}
        />
      )}
    </CustomPressable>
  );
};

const TransferNavCard = ({
  title, // the title of the card
  onPress, // called when the card is pressed
  icon, // the icon of the card
  active,
}: {
  title: string;
  onPress?: () => void;
  icon: any;
  active: boolean;
}) => {
  return (
    <CustomPressable
      onPress={onPress}
      activeOpacity={0.9}
      style={[globalStyles.colBetween, {alignItems: 'center'}]}>
      <View
        style={[
          globalStyles.rowCenter,
          {
            height: ms(62),
            width: ms(62),
            borderRadius: ms(19),
            backgroundColor: active
              ? Colors.navCardActive
              : Colors.navCardInActive,
          },
        ]}>
        <Image
          style={{
            width: ms(19),
            resizeMode: 'contain',
            tintColor: active ? Colors.white : Colors.navCardInActiveImg,
          }}
          source={icon}
        />
      </View>
      <CustomText
        fontSize={fontSz(12)}
        fontWeight="700"
        text={title}
        style={{
          color: Colors.white,
          paddingTop: ms(10),
        }}
      />
    </CustomPressable>
  );
};

const Transfer = ({route, navigation}: NavProps) => {
  const {navigate} = navigation;
  const flatListRef = useRef<FlatList>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<
    'mobile' | 'bank' | 'online' | 'qr'
  >('mobile');

  const filteredOptions = contacts.filter(
    (option: {firstName: string; lastName: string; number: string}) =>
      option.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      option.lastName.includes(searchText) ||
      option.number.includes(searchText),
  );

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bottom,
      }}>
      <KeyboardAwareScrollView
        nestedScrollEnabled
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
        }}
        style={[globalStyles.container, {backgroundColor: Colors.bottom}]}>
        {/* this is the top background view component with purple primary color background and contains the header */}
        <View style={styles.contentViewTop}>
          <CustomText
            fontSize={fontSz(20)}
            fontWeight="700"
            text={`Transfer`}
            style={{
              color: Colors.white,
            }}
          />
          <View
            style={[
              globalStyles.rowBetween,
              {paddingTop: ms(25), width: '100%', paddingHorizontal: ms(20)},
            ]}>
            <TransferNavCard
              title={'Mobile'}
              icon={mobileIcon}
              active={activeTab === 'mobile'}
              onPress={() => setActiveTab('mobile')}
            />
            <TransferNavCard
              title={'Bank'}
              icon={bankIcon}
              active={activeTab === 'bank'}
              onPress={() => setActiveTab('bank')}
            />
            <TransferNavCard
              title={'Online'}
              icon={onlineIcon}
              active={activeTab === 'online'}
              onPress={() => setActiveTab('online')}
            />
            <TransferNavCard
              title={'QR code'}
              icon={qrIcon}
              active={activeTab === 'qr'}
              onPress={() => setActiveTab('qr')}
            />
          </View>
        </View>
        <CustomText
          fontSize={fontSz(18)}
          fontWeight="700"
          text={`Recent`}
          style={{
            color: Colors.chartAmount,
            paddingHorizontal: ms(20),
            paddingTop: ms(30),
            paddingBottom: ms(20),
          }}
        />
        <View>
          <FlatList
            ref={flatListRef}
            horizontal
            keyboardShouldPersistTaps="handled"
            data={contacts}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.contentViewBottom,
              {paddingBottom: ms(15)},
            ]}
            renderItem={({item}) => {
              const {firstName, number, profileImage, id} = item;
              return (
                <RecentCard
                  key={id}
                  title={firstName}
                  number={number}
                  icon={profileImage}
                  onPress={() => {
                    navigate('Receipt');
                  }}
                />
              );
            }}
            keyExtractor={item => item?.id}
          />
        </View>
        <View
          style={[
            {
              flex: 1,
              backgroundColor: Colors.white,
              paddingHorizontal: ms(20),
            },
          ]}>
          <CustomText
            fontSize={fontSz(18)}
            fontWeight="700"
            text={`All contacts`}
            style={{
              color: Colors.chartAmount,
              paddingTop: ms(20),
              paddingBottom: ms(20),
            }}
          />
          <Input
            value={searchText}
            placeholder={'Search name or number.'}
            onChange={handleSearch}
            onEndEditing={() => {}}
            onFocus={() => {}}
            prependComponent={
              <View
                style={{
                  justifyContent: 'center',
                  marginRight: ms(5),
                }}>
                <CustomPressable activeOpacity={0.75}>
                  <SearchIcon />
                </CustomPressable>
              </View>
            }
            errorMsg={''}
          />
          <FlatList
            ref={flatListRef}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.flatListContainer}
            data={filteredOptions}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              const {firstName, lastName, number, profileImage, id} = item;
              return (
                <ContactCard
                  key={id}
                  title={`${firstName} ${lastName}`}
                  number={number}
                  icon={profileImage}
                  showInvite={index <= 2}
                  onPress={() => {
                    navigate('Receipt');
                  }}
                />
              );
            }}
            keyExtractor={item => item?.id}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  contentViewTop: {
    height: '25%',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: ms(30),
    borderBottomRightRadius: ms(30),
    position: 'relative',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? height / hp(16) : hp(24),
    paddingBottom: ms(40),
    justifyContent: 'space-between',
  },
  contentViewBottom: {
    paddingHorizontal: ms(20),
    paddingBottom: ms(40),
    backgroundColor: Colors.bottom,
  },
  navigationCardContainer: {
    alignItems: 'center',
    borderRadius: ms(8),
    paddingVertical: ms(20),
    paddingHorizontal: ms(22.5),
    borderWidth: ms(0.025),
    backgroundColor: Colors.white,
    borderColor: Colors.divider,
    marginRight: ms(15),
  },
  flatListContainer: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingBottom: ms(40),
  },
  contactCard: {
    paddingVertical: ms(12.5),
    paddingBottom: ms(15),
    borderRadius: ms(8),
    marginVertical: ms(7.5),
    backgroundColor: Colors.white,
    borderBottomWidth: ms(0.75),
    borderBottomColor: Colors.dividerDeep,
  },
});
