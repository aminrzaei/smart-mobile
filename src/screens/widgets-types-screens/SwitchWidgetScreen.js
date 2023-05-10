import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import smartApi from '../../api/smartApi';

import Spacer from '../../components/Spacer';
import ServerErrorSnackBar from '../../components/ServerErrorSnackBar';

const SwitchWidgetScreen = ({ route }) => {
  const { name, payload, state } = route.params;
  const [widgetState, setWidgetState] = useState(state);
  const [showServerErrorMsg, SetshowServerErrorMsg] = useState(false);

  const isSwitchOn = () => {
    if (widgetState === 'on') return true;
    return false;
  };

  const sendSwitchState = () => {
    let newState;
    if (widgetState === 'off') newState = 'on';
    else newState = 'off';
    smartApi
      .post(`/${payload}`, {
        newState,
      })
      .then((res) => {
        console.log(`${name} => ${res.data.msg}`);
        setWidgetState(newState);
      })
      .catch((err) => {
        SetshowServerErrorMsg(true);
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Spacer height={60} />
      <View
        style={[
          styles.switchContainer,
          { backgroundColor: isSwitchOn() ? '#1dd1a1' : 'black' },
        ]}
      >
        <Text style={styles.switchTitle}>{widgetState.toUpperCase()}</Text>
        <Switch
          value={isSwitchOn()}
          onValueChange={sendSwitchState}
          trackColor={{ true: '#333', false: 'grey' }}
          color="#fff"
        />
      </View>
      <ServerErrorSnackBar
        visible={showServerErrorMsg}
        onDismiss={() => SetshowServerErrorMsg(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
    justifyContent: 'flex-end',
  },
  switchContainer: {
    marginBottom: 40,
    marginHorizontal: 20,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchTitle: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
export default SwitchWidgetScreen;
