import React, {useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRecoilState} from 'recoil';
import Toast from 'react-native-toast-message';
import {Colors, fontSz, globalStyles, hp, width, wp} from '../../utils';
import Header from '../../components/Header';
import CurrencyInput from '../../components/CurrencyInput';
import {Routes} from '../../routes';
import {Button} from '../../components/Button';
import {PoweredByOmniPayImage} from '../../assets/svg';
import {amountState, walletAmountState} from '../../recoil/atoms/money';
import omniPayApi from '../../utils/omniPay';

// navigation props to identity properties of the screen
interface NavProps {
  navigation: NavigationProp<Routes, 'AddMoney'>;
  route: RouteProp<Routes, 'AddMoney'>;
}

const AddMoney = ({route, navigation}: NavProps) => {
  const {navigate, goBack} = navigation;
  const [amount, setAmount] = useRecoilState(amountState);
  const [walletAmount, setWalletAmount] = useRecoilState(walletAmountState);
  const [loading, setLoading] = useState<boolean>(false);

  const addMoneyMutation = async () => {
    setLoading(true);
    try {
      const response = await omniPayApi.post('/add-money', {
        amount: amount,
      });
      const {error, message} = response?.data;
      setLoading(false);
      if (error === false && message !== undefined) {
        setAmount(Number(''));
        setWalletAmount(prevState => prevState + Number(amount));
        Toast.show({
          type: 'success',
          text1: `Hello there!!!`,
          text2: `${message}`,
        });
        goBack();
      }
      return {
        error,
        message,
      };
    } catch (error: any) {
      const {message} = error?.data;
      Toast.show({
        type: 'error',
        text1: `Hello there!!!`,
        text2: `${message}`,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        {/* header component */}
        <Header
          headerTitle={'Add Money'}
          headerColor={Colors.headerText}
          showBorder
          disabled={loading}
        />

        {/* keyboard aware scroll view to assist input field's keyboard opening */}
        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: wp(40),
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={[
              globalStyles.shadowProp,
              globalStyles.shadowElevation,
              styles.inputContainer,
            ]}>
            {/* current input component */}
            <CurrencyInput
              value={Number(amount)}
              onChangeValue={(value: any) => setAmount(value)}
              ignoreNegative={false}
              delimiter=","
              separator="."
              precision={2}
              containerStyle={{
                width: width * 0.6667,
              }}
            />
            <Button
              disabled={amount <= 0}
              isLoading={loading}
              title={'Submit'}
              style={{
                alignSelf: 'center',
                width: width * 0.6667,
              }}
              onPress={() => {
                addMoneyMutation();
              }}
            />
          </View>
        </KeyboardAwareScrollView>
        {/* powered by component */}
        <View style={styles.poweredBy}>
          <PoweredByOmniPayImage />
        </View>

        <StatusBar
          backgroundColor={Colors.white}
          barStyle={'dark-content'}
          animated={true}
        />
      </View>
    </>
  );
};

export default AddMoney;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: hp(10),
    backgroundColor: Colors.white,
    borderRadius: fontSz(20),
    paddingVertical: hp(25),
    paddingHorizontal: wp(40),
  },
  poweredBy: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
