import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const TextLink = ({ pressFunc, children }) => {
  return (
    <TouchableOpacity onPress={pressFunc} style={styles.bottomLink}>
      <Text style={styles.bottomLinkText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomLink: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  bottomLinkText: {
    fontSize: 16,
    color: '#ACACAC',
  },
});

export default TextLink;
