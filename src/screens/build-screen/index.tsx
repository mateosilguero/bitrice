import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute, RouteProp } from '@react-navigation/native';
import Icon from '../../components/addons/icon';

import LogsScreen from './logs';
import StepsScreen from './steps';
import C, { theme, apply, getSizeFor, Text } from 'consistencss';

import LogContext from './log-context';
import { RootStackProps } from '../../interfaces/routing';

const TabsStack = createBottomTabNavigator();

const BuildStack = () => {
  const { params } = useRoute<RouteProp<RootStackProps, 'Build'>>();
  return (
    <LogContext Build={params}>
      <TabsStack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            const icons = {
              Summary: 'order-bool-ascending-variant',
              Logs: 'book-open',
            };
            type iconsKeys = keyof typeof icons;
            return (
              <Icon
                name={icons[route.name as iconsKeys]}
                size={focused ? 32 : 28}
                color={color}
              />
            );
          },
          tabBarLabel: ({ color }) => (
            <Text style={apply({ color, fontWeight: '700' })}>
              {route.name}
            </Text>
          ),
        })}
        tabBarOptions={{
          activeTintColor: theme.colors.secondary,
          inactiveTintColor: '#aaa',
          style: apply(C.bgPrimary, C.h16, C.pb2, C.pt2, {
            borderTopLeftRadius: getSizeFor(6),
            borderTopRightRadius: getSizeFor(6),
          }),
        }}>
        <TabsStack.Screen name="Summary" component={StepsScreen} />
        <TabsStack.Screen name="Logs" component={LogsScreen} />
      </TabsStack.Navigator>
    </LogContext>
  );
};

export default BuildStack;
