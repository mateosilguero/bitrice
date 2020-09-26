import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import C from 'consistencss';

import HomeScreen from './home';
import LoginScreen from './login';
import BuildsScreen from './builds';
import BuildScreen from './build-screen';
import YamlScreen from './build-yml';
import TriggerScreen from './trigger';
import FinderScreen from './finder';
import NotificationsScreen from './notifications';
import { RootStackProps } from '../interfaces/routing';

const Stack = createStackNavigator<RootStackProps>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          cardStyle: C.bgWhite,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Builds" component={BuildsScreen} />
        <Stack.Screen name="Trigger" component={TriggerScreen} />
        <Stack.Screen name="Finder" component={FinderScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="BuildYaml" component={YamlScreen} />
        <Stack.Screen name="Build" component={BuildScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
