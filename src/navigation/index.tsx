import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Receipt from '../screens/Receipt';
import FinanceScore from '../screens/FinanceScore';
import Transfer from '../screens/Transfer';
import {Routes} from '../routes';
import Details from '../screens/Details';

const Stack = createNativeStackNavigator<Routes>();

const NavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Receipt" component={Receipt} />
      <Stack.Screen name="FinanceScore" component={FinanceScore} />
      <Stack.Screen name="Transfer" component={Transfer} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
