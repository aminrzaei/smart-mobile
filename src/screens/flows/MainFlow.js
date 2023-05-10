import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddWidgetScreen from '../AddWidgetScreen';
import SettingsScreen from '../SettingsScreen';

import WidgetFlow from './WidgetFlow';

const HomeBottomTab = createBottomTabNavigator();

const MainFlow = () => (
  <HomeBottomTab.Navigator
    tabBarOptions={{
      showLabel: false,
      activeTintColor: '#000',
      style: {
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
    }}
  >
    <HomeBottomTab.Screen
      name="WidgetFlow"
      component={WidgetFlow}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="appstore-o" size={size} color={color} />
        ),
      }}
    />
    <HomeBottomTab.Screen
      name="AddWidgets"
      component={AddWidgetScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="plus" size={size} color={color} />
        ),
      }}
    />
    <HomeBottomTab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="setting" size={size} color={color} />
        ),
      }}
    />
  </HomeBottomTab.Navigator>
);

export default MainFlow;
