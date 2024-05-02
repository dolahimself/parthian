import React, {useRef} from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {
  Colors,
  fontSz,
  formatCurrency,
  globalStyles,
  height,
  hp,
  ms,
  width,
} from '../../utils';
import {CustomText} from '../../components/Text';
import {CustomPressable} from '../../components/Button';
import {BackArrowIcon, BurgerIcon, PillIcon} from '../../assets/svg';
import {ChartTypeCard} from '../Home';
import {Routes} from '../../routes';
import {LineChart} from 'react-native-chart-kit';

interface NavProps {
  navigation: NavigationProp<Routes, 'Details'>;
  route: RouteProp<Routes, 'Details'>;
}

const pizzaHutIcon = require('../../assets/img/pizza-hut.png');
const subwayIcon = require('../../assets/img/subway.png');
const amazonIcon = require('../../assets/img/amazon.png');

export const categories = [
  {
    id: 0,
    title: 'Lunch & Dinner',
    amount: 450,
    image: <BurgerIcon />,
  },
  {
    id: 1,
    title: 'Medical Allowances',
    amount: 330,
    image: <PillIcon />,
  },
];

const DetailCard = ({
  title, // the title of the card
  number, // the number of the card
  onPress, // called when the card is pressed
  icon, // the icon of the card
  amount,
}: {
  title: string;
  number: number;
  onPress?: () => void;
  amount: number;
  icon: any;
}) => {
  return (
    <CustomPressable
      activeOpacity={0.9}
      onPress={onPress}
      style={[globalStyles.rowBetween, styles.detailCard]}>
      <View
        style={{
          width: ms(50),
          height: ms(50),
          borderRadius: ms(15),
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: ms(28), borderRadius: ms(10), resizeMode: 'contain'}}
          source={icon}
          //   resizeMode={FastImage.resizeMode.contain}
        />
      </View>
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
            color: Colors.chartType,
            paddingTop: ms(5),
          }}
          fontWeight="400"
          fontSize={fontSz(15)}
          text={`${number} transactions` ?? ''}
        />
      </View>

      <CustomPressable
        activeOpacity={1}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomText
          style={{
            color: Colors.chartAmount,
          }}
          fontWeight="700"
          fontSize={fontSz(18)}
          text={`${formatCurrency(amount, '$')}`}
        />
      </CustomPressable>
    </CustomPressable>
  );
};

const CategoryCard = ({
  title, // the title of the card
  amount, // the number of the card
  onPress, // called when the card is pressed
  image, // the icon of the card
}: {
  title: string;
  amount: number;
  onPress?: () => void;
  image: string;
}) => {
  return (
    <CustomPressable
      activeOpacity={1}
      style={[globalStyles.colBetween, styles.categoryCardContainer]}>
      <AnimatedCircularProgress
        size={ms(110)}
        width={ms(7)}
        fill={60}
        tintColor={'rgba(164, 129, 250, 1)'}
        //@ts-ignore
        tintColorSecondary={'rgba(75, 62, 204, 1)'}
        backgroundColor={Colors.progressBarInActive}
        backgroundWidth={ms(5)}
        arcSweepAngle={240}
        rotation={240}
        lineCap="round">
        {fill => <View>{image ?? image}</View>}
      </AnimatedCircularProgress>
      <View style={[globalStyles.colBetween, {alignItems: 'center', flex: 1}]}>
        <View
          style={[
            {
              flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <CustomText
            fontSize={fontSz(16)}
            fontWeight="700"
            text={title ?? ``}
            textAlign={'center'}
            style={{
              color: Colors.chartAmount,
            }}
          />
        </View>
        <CustomText
          fontSize={fontSz(15)}
          fontWeight="400"
          text={`${formatCurrency(amount, '$')}`}
          textAlign={'center'}
          style={{
            color: Colors.chartAmount,
            paddingTop: ms(7.5),
          }}
        />
      </View>
      <CustomPressable
        activeOpacity={0.85}
        onPress={onPress}
        style={{
          backgroundColor: Colors.bottom,
          paddingHorizontal: ms(20),
          paddingVertical: ms(10),
          borderRadius: ms(18),
          marginTop: ms(10),
        }}>
        <CustomText
          fontSize={fontSz(12)}
          fontWeight="500"
          text={`on track`}
          textAlign={'center'}
          style={{
            color: Colors.onTract,
          }}
        />
      </CustomPressable>
    </CustomPressable>
  );
};

const Details = ({route, navigation}: NavProps) => {
  const {navigate, goBack} = navigation;
  const flatListRef = useRef<FlatList>(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      {/* header */}
      <View
        style={[
          globalStyles.rowBetween,
          {
            backgroundColor: Colors.white,
            alignItems: 'flex-start',
            paddingHorizontal: ms(30),
            paddingTop: Platform.OS === 'ios' ? height / hp(16) : hp(24),
            paddingBottom: ms(7.5),
          },
        ]}>
        <CustomPressable activeOpacity={0.85} onPress={() => goBack()}>
          <BackArrowIcon />
        </CustomPressable>
        <CustomPressable activeOpacity={1}>
          <CustomText
            fontSize={fontSz(16)}
            fontWeight="700"
            text={`Set Budget`}
            style={{
              color: Colors.primary,
            }}
          />
        </CustomPressable>
      </View>
      {/* base scroll view */}
      <ScrollView
        style={[
          globalStyles.container,
          {flex: 1, backgroundColor: Colors.bottom},
        ]}
        showsVerticalScrollIndicator={false}>
        {/* this is the top background view component with purple primary color background and contains the header */}
        <View style={styles.contentViewTop}>
          <CustomText
            fontSize={fontSz(22)}
            fontWeight="700"
            text={`Your balance is ${formatCurrency(2639, '$')}`}
            textAlign={'center'}
            style={{
              color: Colors.chartAmount,
              paddingTop: ms(22.5),
            }}
          />
          <Text
            style={{
              color: Colors.chartType,
              fontSize: fontSz(15),
              fontWeight: '400',
              textAlign: 'center',
              paddingTop: ms(7.5),
            }}>
            Last month, you spent
            <CustomText
              fontSize={fontSz(15)}
              fontWeight="400"
              text={` ${formatCurrency(2719, '$')}`}
              textAlign={'center'}
              style={{
                color: Colors.chartAmount,
              }}
            />
          </Text>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={width * 1.0} // from react-native
            height={ms(220)}
            verticalLabelRotation={0}
            yAxisLabel="$"
            yAxisSuffix="k"
            chartConfig={{
              backgroundColor: Colors.white,
              backgroundGradientFrom: Colors.white,
              backgroundGradientTo: Colors.white,
              color: (opacity = 1) => `rgba(113, 101, 227, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(113, 101, 227, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '5',
                strokeWidth: '6',
                stroke: Colors.primaryLight,
              },
            }}
            bezier
            // fromZero={false}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={false}
            withVerticalLabels={true}
            withHorizontalLabels={true}
            style={{
              marginTop: 8,
            }}
            // propsForHorizontalLabels
          />
        </View>
        {/* this is the bottom background view thats white or transparent */}
        <View style={styles.contentView}>
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
                amount={`${formatCurrency(2730, '$')}`}
                type={'Earned'}
                color={Colors.credit}
              />
              <ChartTypeCard
                amount={`${formatCurrency(1460, '$')}`}
                type={'Spent'}
                color={Colors.debit}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: ms(30),
            }}>
            <CustomText
              fontSize={fontSz(18)}
              fontWeight="700"
              text={`Top Transaction`}
              style={{
                color: Colors.chartAmount,
                paddingBottom: ms(15),
              }}
            />
            <DetailCard
              title={`PizzaHut`}
              number={4}
              icon={pizzaHutIcon}
              amount={200}
              onPress={() => {
                navigate('Receipt');
              }}
            />
            <DetailCard
              title={`Amazon`}
              number={3}
              icon={amazonIcon}
              amount={180}
              onPress={() => {
                navigate('Receipt');
              }}
            />
            <DetailCard
              title={`Subway`}
              number={2}
              icon={subwayIcon}
              amount={125}
              onPress={() => {
                navigate('Receipt');
              }}
            />
          </View>
          <View
            style={{
              marginTop: ms(30),
            }}>
            <CustomText
              fontSize={fontSz(18)}
              fontWeight="700"
              text={`Top Category`}
              style={{
                color: Colors.chartAmount,
                paddingBottom: ms(15),
              }}
            />
            <FlatList
              ref={flatListRef}
              horizontal
              keyboardShouldPersistTaps="handled"
              data={categories}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.contentViewBottom,
                {paddingBottom: ms(50)},
              ]}
              renderItem={({item}) => {
                const {amount, title, image, id} = item;
                return (
                  <CategoryCard
                    key={id}
                    title={title}
                    amount={amount}
                    image={image}
                    onPress={() => {
                      navigate('Receipt');
                    }}
                  />
                );
              }}
              keyExtractor={item => item?.id}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  contentViewTop: {
    // flex: 0.35,
    width: width,
    backgroundColor: Colors.white,
  },
  contentView: {
    // flex: 0.65,
    alignSelf: 'center',
    width: width,
    backgroundColor: Colors.transparent,
    paddingHorizontal: ms(30),
    marginTop: ms(-35),
  },
  chartTypeWrapper: {
    width: '100%',
    borderRadius: ms(8),
    backgroundColor: Colors.white,
    borderWidth: ms(0.025),
    borderColor: Colors.divider,
  },
  detailCard: {
    paddingVertical: ms(12.5),
    paddingBottom: ms(15),
    borderRadius: ms(8),
    marginVertical: ms(7.5),
    backgroundColor: Colors.transparent,
    borderBottomWidth: ms(0.75),
    borderBottomColor: Colors.dividerDeep,
  },
  contentViewBottom: {
    paddingBottom: ms(50),
    backgroundColor: Colors.bottom,
  },
  categoryCardContainer: {
    width: ms(180),
    alignItems: 'center',
    borderRadius: ms(8),
    paddingVertical: ms(20),
    paddingHorizontal: ms(22.5),
    borderWidth: ms(0.025),
    backgroundColor: Colors.white,
    borderColor: Colors.divider,
    marginRight: ms(15),
  },
});
