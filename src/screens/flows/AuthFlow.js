import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import ResolveAuthScreen from '../ResolveAuthScreen';
import LogInScreen from '../LogInScreen';
import SignUpScreen from '../SignUpScreen';

import MainFlow from './MainFlow';

const AuthStack = createStackNavigator();

const AuthFlow = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <AuthStack.Navigator>
      {token ? (
        <AuthStack.Screen
          name="MainFlow"
          component={MainFlow}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <AuthStack.Screen
            name="ResolveAuth"
            component={ResolveAuthScreen}
            options={{
              headerShown: false,
            }}
          />
          <AuthStack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{
              headerShown: false,
            }}
          />
          <AuthStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </AuthStack.Navigator>
  );
};

export default AuthFlow;
