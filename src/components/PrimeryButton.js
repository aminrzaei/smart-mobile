import React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const PrimeryButton = ({ isLoading, pressFunc, children }) => {
  const RenderChildren = () => {
    if (isLoading) {
      return (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator animating={true} color={Colors.white} />
        </View>
      );
    } else return children;
  };
  return (
    <TouchableOpacity onPress={pressFunc}>
      <View style={styles.primeryButton}>
        <Text style={styles.primeryButtonTitle}>
          <RenderChildren />
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primeryButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    height: 55,
    borderRadius: 6,
    backgroundColor: 'black',
    color: 'white',
  },
  primeryButtonTitle: {
    color: 'white',
    fontSize: 20,
  },
});

export default PrimeryButton;
