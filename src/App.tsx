/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import C, { apply, extend } from 'consistencss';
import { SWRConfig } from 'swr';
import RootStack from './screens';
import { fetcher } from './services/bitrise';
import OfflineScreen from './screens/offline';

extend({
  colors: {
    primary: '#683d87',
    primaryLight: '#760FC3',
    primaryDark: '#492f5c',
    secondary: '#0dd3c5',
    success: '#0fc389',
    warning: '#ffc500',
    error: '#ff2158',
  },
  fonts: {
    primary: 'ttnorms_medium',
  },
  components: {
    Text: { fontFamily: 'ttnorms_medium' },
  },
});

const App = () => (
  <>
    <StatusBar backgroundColor="white" barStyle="dark-content" />
    <SafeAreaView style={apply(C.flex, C.bgWhite)}>
      <SWRConfig value={{ fetcher }}>
        <RootStack />
        <OfflineScreen />
      </SWRConfig>
    </SafeAreaView>
  </>
);

export default App;
