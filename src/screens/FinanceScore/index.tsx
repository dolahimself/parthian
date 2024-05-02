import React from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Colors, fontSz, globalStyles, height, hp, ms} from '../../utils';
import {IllustrationIcon} from '../../assets/svg';
import {CustomText} from '../../components/Text';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Routes} from '../../routes';
import {CustomPressable} from '../../components/Button';

interface NavProps {
  navigation: NavigationProp<Routes, 'FinanceScore'>;
  route: RouteProp<Routes, 'FinanceScore'>;
}

const RecommendationCard = ({
  title, // the title of the card
  text, // the title of the card
  number, // the number of the card
  onPress, // called when the card is pressed
}: {
  title: string;
  text: string;
  number: string;
  onPress?: () => void;
}) => {
  return (
    <View
      style={[
        globalStyles.rowBetween,
        {
          alignItems: 'flex-start',
          backgroundColor: Colors.white,
          borderRadius: ms(8),
          paddingHorizontal: ms(15),
          paddingVertical: ms(25),
          marginBottom: ms(20),
        },
      ]}>
      <View
        style={{
          height: ms(52),
          width: ms(52),
          borderRadius: ms(16),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primary,
          marginTop: ms(2.5),
        }}>
        <CustomText
          fontSize={fontSz(15)}
          fontWeight="700"
          text={number}
          style={{
            color: Colors.white,
          }}
        />
      </View>
      <View
        style={[
          globalStyles.colBetween,
          {
            flex: 1,
            paddingLeft: ms(25),
          },
        ]}>
        <CustomText
          style={{
            color: Colors.recommendationHeader,
          }}
          fontWeight="700"
          fontSize={fontSz(16)}
          text={title ?? ''}
        />
        <CustomText
          style={{
            color: Colors.chartAmount,
            paddingVertical: ms(15),
          }}
          fontWeight="700"
          fontSize={fontSz(13)}
          lineHeight={fontSz(20)}
          text={text ?? ''}
        />
        <CustomPressable activeOpacity={0.9}>
          <CustomText
            style={{
              color: Colors.primary,
            }}
            fontWeight="700"
            fontSize={fontSz(15)}
            text={'More details'}
          />
        </CustomPressable>
      </View>
    </View>
  );
};

const FinanceScore = ({route, navigation}: NavProps) => {
  const {navigate, goBack} = navigation;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bottom,
      }}>
      <View style={[globalStyles.container, {backgroundColor: Colors.bottom}]}>
        {/* this is the top background view component with purple primary color background and contains the header */}
        <View style={styles.contentViewTop}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <IllustrationIcon />
          </View>
          <CustomText
            fontSize={fontSz(20)}
            fontWeight="700"
            text={`Finance Score`}
            style={{
              color: Colors.white,
              paddingTop: ms(27.5),
            }}
          />
          <View
            style={{
              alignItems: 'center',
            }}>
            <CustomText
              fontSize={fontSz(22)}
              fontWeight="700"
              text={`It can be better!`}
              style={{
                color: Colors.white,
                paddingBottom: ms(5),
              }}
            />
            <CustomText
              fontSize={fontSz(18)}
              fontWeight="400"
              text={`Below are some recommendations`}
              style={{
                color: Colors.white,
                opacity: 0.8,
              }}
            />
          </View>
        </View>
        <CustomText
          fontSize={fontSz(18)}
          fontWeight="700"
          text={`Recommendation`}
          style={{
            color: Colors.chartAmount,
            paddingBottom: ms(15),
            paddingHorizontal: ms(20),
            paddingVertical: ms(40),
          }}
        />
        {/* this is the bottom background view thats white or transparent */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentViewBottom}>
          <RecommendationCard
            title={'Spending'}
            text={
              'You spent $468 on food. That’s 50% higher than the average of our users.'
            }
            number={'+17'}
          />
          <RecommendationCard
            title={'Credit'}
            text={
              'You were late to pay last month’s card bills. Lets try to be on time this month.'
            }
            number={'+8'}
          />
          <RecommendationCard
            title={'Credit'}
            text={
              'You were late to pay last month’s card bills. Lets try to be on time this month.'
            }
            number={'+8'}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default FinanceScore;

const styles = StyleSheet.create({
  contentViewTop: {
    height: '42.5%',
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
});
