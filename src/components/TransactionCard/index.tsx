import React from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import {Colors, fontSz, formatCurrency, globalStyles, hp} from '../../utils';
import {CreditIcon, DebitIcon} from '../../assets/svg';
import {CustomText} from '../Text';
import {CustomPressable} from '../Pressable';

const getTextColor = (status: 'debit' | 'credit') => {
  switch (status) {
    case 'debit':
      return Colors.debitRed;
    case 'credit':
      return Colors.creditGreen;
  }
};

const getBackgroundColor = (status: 'debit' | 'credit') => {
  switch (status) {
    case 'debit':
      return Colors.debitRedBackground;
    case 'credit':
      return Colors.creditGreenBackground;
  }
};

const showIcon = (status: 'debit' | 'credit') => {
  switch (status) {
    case 'debit':
      return <DebitIcon />;
    case 'credit':
      return <CreditIcon />;
    default:
      break;
  }
};

const TransactionIcon = ({status}: {status: 'debit' | 'credit'}) => {
  return (
    <View
      style={[
        styles.iconContainer,
        {
          backgroundColor: getBackgroundColor(status),
        },
      ]}>
      {showIcon(status)}
    </View>
  );
};

const TransactionCard = ({
  status,
  title,
  transactionType,
}: {
  status: 'debit' | 'credit';
  title: string;
  transactionType: string;
}) => {
  return (
    <CustomPressable
      style={[
        globalStyles.rowBetween,
        {
          marginVertical: hp(10),
          height: fontSz(45),
        },
      ]}>
      <View
        style={[
          globalStyles.rowStart,
          {
            height: '100%',
            alignItems: 'flex-start',
          },
        ]}>
        <TransactionIcon status={status} />
        <View
          style={[
            globalStyles.colBetween,
            {
              height: '100%',
            },
          ]}>
          <CustomText
            fontWeight="400"
            style={{
              color: Colors.transactionCardHeader,
              textTransform: 'capitalize',
            }}
            fontSize={fontSz(13)}
            text={title ?? ''}
          />
          <View style={styles.transactionTypeContainer}>
            <CustomText
              fontWeight="400"
              style={[
                {
                  color: Colors.tabInactiveText,
                  textTransform: 'capitalize',
                },
              ]}
              fontSize={fontSz(11)}
              text={transactionType ?? ''}
            />
          </View>
        </View>
      </View>
      <View
        style={[
          globalStyles.colBetween,
          {
            height: '100%',
            alignItems: 'flex-end',
          },
        ]}>
        <CustomText
          style={{
            color: getTextColor(status),
          }}
          fontWeight="400"
          fontSize={fontSz(13)}
          text={formatCurrency(35000)}
        />
        <CustomText
          fontWeight="400"
          style={{
            color: Colors.transactionCardTime,
          }}
          fontSize={fontSz(13)}
          text={moment(new Date()).format('DD-MM-YY LT')}
        />
      </View>
    </CustomPressable>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: fontSz(45),
    height: fontSz(45),
    borderRadius: fontSz(45 / 2),
    marginRight: fontSz(12.5),
  },
  transactionTypeContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: fontSz(8),
    paddingVertical: fontSz(5),
    borderRadius: fontSz(4),
    backgroundColor: Colors.transactionCardTypeBackground,
  },
});
