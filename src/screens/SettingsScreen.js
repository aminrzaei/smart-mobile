import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  Button,
  Snackbar,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from 'expo-clipboard';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { signout } from '../actions';

import smartApi from '../api/smartApi';

import Spacer from '../components/Spacer';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [ardToken, setArdToken] = useState('');
  const [ardMsg, setArdMsg] = useState('');
  const [indicatorVisivility, setIndicatorVisivility] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const arduinoToken = await AsyncStorage.getItem('arduinoToken');
        setArdToken(arduinoToken);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleRefreshToken = async () => {
    const newArduinoToken = uuid();
    try {
      setIndicatorVisivility(true);
      const response = await smartApi.post('/refresh-token', {
        newArduinoToken,
      });
      await AsyncStorage.setItem('arduinoToken', response.data.arduinoToken);
      setIndicatorVisivility(false);
      setArdToken(response.data.arduinoToken);
      setArdMsg('Your Arduino Token Changed Successfully');
    } catch (err) {
      setArdMsg('Something Wrong Happend');
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await Clipboard.setString(ardToken);
      setArdMsg(`${ardToken} Copied To Clipboard !`);
    } catch (err) {
      console.log(err);
    }
  };

  const RenderRefreshButton = () => {
    if (indicatorVisivility) {
      return (
        <ActivityIndicator
          style={styles.tokenRefreshIndicator}
          animating={true}
          color={Colors.blue400}
        />
      );
    } else {
      return (
        <Button
          mode="text"
          uppercase={false}
          color="#0066FF"
          labelStyle={{ fontSize: 16 }}
          onPress={handleRefreshToken}
        >
          Refresh
        </Button>
      );
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.pageTitle}>Settings</Text>
      <Spacer height={30} />
      <View style={styles.tokenContainer}>
        <View style={styles.tokenHeader}>
          <Text style={styles.tokenTitle}>Arduino Token</Text>
          <RenderRefreshButton />
        </View>
        <TouchableOpacity onPress={handleCopyToClipboard}>
          <Text style={{ color: '#828282' }}>{ardToken}</Text>
        </TouchableOpacity>
      </View>

      <Button
        style={styles.logOut}
        uppercase={false}
        mode="text"
        color="#FF8585"
        labelStyle={{ fontSize: 18 }}
        onPress={() => dispatch(signout())}
      >
        Logout
      </Button>
      <Snackbar
        visible={!!ardMsg}
        duration={2500}
        onDismiss={() => {
          setArdMsg('');
          setIndicatorVisivility(false);
        }}
        action={{
          label: 'OK',
          onPress: () => {},
        }}
      >
        {ardMsg}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    color: 'black',
    fontSize: 35,
    marginLeft: 15,
    marginTop: 15,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    paddingTop: 10,
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
  },
  tokenContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 18,
    padding: 10,
    borderRadius: 10,
  },
  tokenHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    flexDirection: 'row',
  },
  tokenTitle: {
    color: 'black',
    fontSize: 20,
  },
  tokenRefreshIndicator: { marginTop: 8, marginBottom: 8, marginRight: 15 },
  logOut: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
export default SettingsScreen;
