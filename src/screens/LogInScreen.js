import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackHandler } from 'react-native';

import AuthForm from '../components/AuthForm';

const LogInScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      BackHandler.exitApp();
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthForm navigation={navigation} />
    </SafeAreaView>
  );
};

export default LogInScreen;
