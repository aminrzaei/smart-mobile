import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Action = ({ action, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View key={action.name} style={styles.actionContainer}>
        <Text style={styles.actionTitle}>{action.name}</Text>
        <AntDesign name={action.icon} size={35} color="black"></AntDesign>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Action;
