import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SearchInput = ({ searchValue, onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        onChangeText={(text) => onSearch(text)}
        value={searchValue}
        placeholder="Search Any Widget"
        style={styles.serachTextInput}
      />
      <TouchableOpacity onPress={() => console.log('SEARCH ...')}>
        <AntDesign
          name="search1"
          size={24}
          color="black"
          style={styles.searchIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 50,
  },
  serachTextInput: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  searchIcon: {},
});

export default SearchInput;
