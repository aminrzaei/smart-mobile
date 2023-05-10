import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WidgetsScreen from '../WidgetsScreen';
import SwitchWidgetScreen from '../widgets-types-screens/SwitchWidgetScreen';
import MapWidgetScreen from '../widgets-types-screens/MapWidgetScreen';

const WidgetStack = createStackNavigator();

const WidgetFlow = () => (
  <WidgetStack.Navigator>
    <WidgetStack.Screen
      name="Widgets"
      component={WidgetsScreen}
      options={{
        headerShown: false,
      }}
    />
    <WidgetStack.Screen
      name="SwitchWidget"
      component={SwitchWidgetScreen}
      options={({ route }) => ({
        title: route.params.name,
        headerTransparent: true,
      })}
    />
    <WidgetStack.Screen
      name="MapWidget"
      component={MapWidgetScreen}
      options={({ route }) => ({
        title: route.params.name,
        headerTransparent: true,
      })}
    />
  </WidgetStack.Navigator>
);

export default WidgetFlow;
