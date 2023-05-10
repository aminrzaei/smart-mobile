import React, { useState, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import { AntDesign } from '@expo/vector-icons';

const InternetConnectionSnackBar = () => {
  [showNoInternetSnack, setShowNoInternetSnack] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setShowNoInternetSnack(!state.isConnected);
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
  }, []);

  return (
    <Snackbar
      visible={showNoInternetSnack}
      duration={5000}
      onDismiss={() => console.log('Amin')}
      action={{
        label: <AntDesign name="disconnect" size={20} color="#eb4d4b" />,
        onPress: () => {},
      }}
    >
      Make sure you have internet connection!
    </Snackbar>
  );
};

export default InternetConnectionSnackBar;
