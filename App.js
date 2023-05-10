import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';

import { Provider as PaperProvider } from 'react-native-paper';

import { navigationRef } from './src/RootNavigation';

import AuthFlow from './src/screens/flows/AuthFlow';

import InternetConnectionSnackBar from './src/components/InternetConnectionSnackBar';

const store = createStore(reducers, applyMiddleware(thunk));
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
        <AuthFlow />
      </NavigationContainer>
      <InternetConnectionSnackBar />
    </SafeAreaProvider>
  );
};

const WrappedApp = () => (
  <Provider store={store}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </Provider>
);

export default WrappedApp;
