import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';

const ServerErrorSnackBar = ({ visible, onDismiss }) => {
  return (
    <Snackbar
      visible={visible}
      duration={8000}
      onDismiss={onDismiss}
      action={{
        label: <AntDesign name="database" size={20} color="#eb4d4b" />,
        onPress: () => {},
      }}
    >
      Can't connect to server!
    </Snackbar>
  );
};

export default ServerErrorSnackBar;
