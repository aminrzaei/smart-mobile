import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthForm from '../components/AuthForm';

const SignUpScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthForm navigation={navigation} />
    </SafeAreaView>
  );
};

export default SignUpScreen;
