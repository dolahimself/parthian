import React, {useEffect} from 'react';
import {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Colors, fontSz, hp, wp} from '../../utils';
import {CustomText} from '../Text';
import {CustomPressable} from '../Pressable';

const Tab = ({
  active,
  label,
  onPress,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) => {
  return (
    <CustomPressable
      style={[
        styles.pill,
        {
          backgroundColor: active ? Colors.white : Colors.tabBackground,
          width: '33%',
          height: '100%',
        },
      ]}
      onPress={onPress}>
      <CustomText
        style={[
          styles.title,
          {
            color: active ? Colors.primary : Colors.tabInactiveText,
            fontSize: fontSz(14),
          },
        ]}
        fontWeight={'500'}
        text={label}
      />
    </CustomPressable>
  );
};

const ToggleTabs = ({
  selectedTab,
  currentTab,

  firstLabel = '',
  secondLabel = '',
  thirdLabel = '',
}: {
  selectedTab: any;
  currentTab?: 0 | 1 | 2;
  firstLabel?: string;
  secondLabel?: string;
  thirdLabel?: string;
}) => {
  const [first, setFirst] = useState<boolean>(true);
  const [second, setSecond] = useState<boolean>(false);
  const [third, setThird] = useState<boolean>(false);

  useEffect(() => {
    setFirst(currentTab === 0 ? true : false);
    setSecond(currentTab === 1 ? true : false);
    setThird(currentTab === 2 ? true : false);
    selectedTab(currentTab);
  }, [currentTab]);

  const toggle = (e: 0 | 1 | 2) => {
    if (e === 0) {
      selectedTab(0);
      setFirst(true);
      setSecond(false);
      setThird(false);
    } else if (e === 1) {
      selectedTab(1);
      setFirst(false);
      setSecond(true);
      setThird(false);
    } else if (e === 2) {
      selectedTab(2);
      setFirst(false);
      setSecond(false);
      setThird(true);
    } else {
      return;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: '100%',
          backgroundColor: Colors.tabBackground,
          paddingVertical: wp(12.5),
          marginBottom: hp(2.5),
        },
      ]}>
      {/* tabs */}
      <Tab active={first} label={firstLabel} onPress={() => toggle(0)} />
      <Tab active={second} label={secondLabel} onPress={() => toggle(1)} />
      <Tab active={third} label={thirdLabel} onPress={() => toggle(2)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(12.5),
    height: hp(40),
    borderRadius: fontSz(9),
  },
  pill: {
    borderRadius: fontSz(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
});

export default ToggleTabs;
