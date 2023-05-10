import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuid } from 'uuid';
import smartApi from '../api/smartApi';
import { navigate } from '../RootNavigation';

import { LOGIN, SIGNOUT, CLEAR_ERROR_MESSAGE, ADD_ERROR } from './types';

export const tryLocalSignin = () => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: LOGIN, payload: token });
    navigate('MainFlow');
  } else {
    navigate('LogIn');
  }
};

export const clearErrorMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR_MESSAGE });
};

export const signup = (email, password) => async (dispatch) => {
  try {
    const arduinoToken = uuid();
    const response = await smartApi.post('/signup', {
      email,
      password,
      arduinoToken,
    });
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('arduinoToken', arduinoToken);
    dispatch({ type: LOGIN, payload: response.data.token });
    navigate('MainFlow');
  } catch (err) {
    console.log(err);
    dispatch({
      type: ADD_ERROR,
      payload: 'Something went wrong with sign up',
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await smartApi.post('/login', {
      email,
      password,
    });
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('arduinoToken', response.data.arduinoToken);
    dispatch({ type: LOGIN, payload: response.data.token });
    navigate('MainFlow');
  } catch (err) {
    dispatch({
      type: ADD_ERROR,
      payload: 'Something went wrong with Log in',
    });
  }
};

export const signout = () => async (dispatch) => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('arduinoToken');
  dispatch({ type: SIGNOUT });
  navigate('LogIn');
};
