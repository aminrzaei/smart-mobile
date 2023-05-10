import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup, clearErrorMessage } from '../actions';

import Spacer from '../components/Spacer';
import PrimeryButton from './PrimeryButton';
import TextLink from './TextLink';
import PrimeryTextInput from './PrimeryTextInput';

const AuthForm = ({ navigation }) => {
  const routeName = useRoute().name;
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.auth.errorMessage);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);

  const formValidator = () => {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (email === '' || password === '') return false;
    if (!emailRegex.test(email)) return false;
    return true;
  };

  const handleAuthSubmit = () => {
    if (!formValidator()) {
      setIsFormValid(false);
      return;
    } else {
      if (routeName === 'LogIn') {
        dispatch(login(email, password));
      } else {
        dispatch(signup(email, password));
      }
      setShowIndicator(true);
    }
  };

  const RenderMsg = () => {
    if (routeName === 'LogIn') {
      return 'Welcome Back,';
    } else {
      return 'Create Account,';
    }
  };

  const RenderSubmitBtnContent = () => {
    if (routeName === 'LogIn') {
      return 'Login';
    } else {
      return 'Signup';
    }
  };

  const RenderBottomLink = () => {
    if (routeName === 'LogIn') {
      return (
        <TextLink pressFunc={() => navigation.navigate('SignUp')}>
          New User? <Text style={{ color: 'black' }}>Signup</Text>
        </TextLink>
      );
    } else {
      return (
        <TextLink pressFunc={() => navigation.navigate('LogIn')}>
          Have Account? <Text style={{ color: 'black' }}>Login</Text>
        </TextLink>
      );
    }
  };

  return (
    <>
      <Spacer height={60} />
      <Text style={styles.welcomeText}>
        <RenderMsg />
      </Text>
      <Spacer height={55} />
      <PrimeryTextInput
        onChangeTextFunc={(text) => setEmail(text)}
        value={email}
        lable={'Email'}
        type={'email-address'}
      />
      <Spacer height={35} />
      <PrimeryTextInput
        onChangeTextFunc={(text) => setPassword(text)}
        value={password}
        lable={'Password'}
        type={'default'}
      />
      <Spacer height={80} />
      <PrimeryButton pressFunc={handleAuthSubmit} isLoading={showIndicator}>
        <RenderSubmitBtnContent />
      </PrimeryButton>
      <Spacer height={120} />
      <RenderBottomLink />
      <Snackbar
        visible={!!errorMsg}
        duration={2500}
        onDismiss={() => {
          dispatch(clearErrorMessage());
          setShowIndicator(false);
        }}
        action={{
          label: 'OK',
          onPress: () => {},
        }}
      >
        {errorMsg}
      </Snackbar>
      <Snackbar
        visible={!isFormValid}
        duration={2500}
        onDismiss={() => setIsFormValid(true)}
        action={{
          label: 'OK',
          onPress: () => {},
        }}
      >
        Enter Valid Email or Password
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    alignSelf: 'flex-start',
    fontSize: 32,
    marginLeft: 30,
  },
});

export default AuthForm;
