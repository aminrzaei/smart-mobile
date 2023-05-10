import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { tryLocalSignin } from '../actions';

const ResolveAuthScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tryLocalSignin());
  }, []);

  return null;
};

export default ResolveAuthScreen;
