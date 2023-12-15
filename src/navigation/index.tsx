import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AddMoney from '../screens/AddMoney';
import {Routes} from '../routes';

const Stack = createNativeStackNavigator<Routes>();

const NavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddMoney" component={AddMoney} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
