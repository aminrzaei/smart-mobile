import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../../components/Spacer';

const MapWidgetScreen = ({ route }) => {
  const { name, payload } = route.params;
  return (
    <View style={styles.centered}>
      <Text style={{ fontSize: 25, color: '#333' }}>
        Will be added soon ...
      </Text>
    </View>
    // <SafeAreaView style={styles.mainContainer}>
    //   <Spacer height={60} />
    //   <Text>{name}</Text>
    //   <Text>{payload}</Text>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
  },
});
export default MapWidgetScreen;

MapWidgetScreen;
