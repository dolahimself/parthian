import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';
import Toast from 'react-native-toast-message';
import NavigationStack from './src/navigation';

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <NavigationStack />
        <Toast />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
