import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const PrimeryTextInput = ({ onChangeTextFunc, value, type, lable }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLable}>{lable}</Text>
      <TextInput
        keyboardType={type}
        autoCompleteType="off"
        style={styles.textInputStyle}
        onChangeText={onChangeTextFunc}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    paddingHorizontal: 35,
  },
  textInputStyle: {
    height: 40,
    borderBottomColor: '#757575',
    borderBottomWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    fontSize: 18,
  },
  inputLable: {
    color: '#3F3F3F',
    fontSize: 18,
    marginBottom: 3,
    alignSelf: 'flex-start',
  },
});

export default PrimeryTextInput;
