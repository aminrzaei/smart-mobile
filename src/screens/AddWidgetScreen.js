import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { Snackbar, ActivityIndicator, Colors } from 'react-native-paper';

import smartApi from '../api/smartApi';

import SearchInput from '../components/SearchInput';
import Widget from '../components/Widget';
import ServerErrorSnackBar from '../components/ServerErrorSnackBar';

const AddWidgetScreen = () => {
  const [widgets, setWidgets] = useState([]);
  const [filterdWidgets, setFilterdWidgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [addingMsg, setAddingMsg] = useState('');
  const [indicatorIndex, setIndicatorIndex] = useState(null);
  const [showServerErrorMsg, SetshowServerErrorMsg] = useState(false);

  useEffect(() => {
    getWidgets();
  }, []);

  useEffect(() => {
    const filterd = widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm)
    );
    setFilterdWidgets(filterd);
  }, [widgets, searchTerm]);

  const getWidgets = async () => {
    try {
      const response = await smartApi.get('/widgets');
      setWidgets(response.data.widgets);
      setFilterdWidgets(widgets);
    } catch (err) {
      SetshowServerErrorMsg(true);
      console.log(err);
    }
  };

  const addWidget = async (widgetId) => {
    try {
      setIndicatorIndex(widgetId);
      const response = await smartApi.post('/user/widget', { widgetId });
      setAddingMsg(response.data.msg);
      setIndicatorIndex(null);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      setIndicatorIndex(null);
    }
  };

  const RenderWidgets = () => {
    if (!!widgets.length) {
      return filterdWidgets.map((widget) => (
        <Widget
          key={widget._id}
          widget={widget}
          indicatorIndex={indicatorIndex}
          btnFunc={addWidget}
        />
      ));
    } else
      return (
        <ActivityIndicator
          size={50}
          style={{ flex: 1 }}
          animating={true}
          color={Colors.black}
        />
      );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <RenderWidgets />
      <View style={styles.searchInputContainer}>
        <SearchInput searchValue={searchTerm} onSearch={setSearchTerm} />
      </View>
      <Snackbar
        visible={!!addingMsg}
        duration={3000}
        onDismiss={() => setAddingMsg('')}
        action={{
          label: 'OK',
          onPress: () => {},
        }}
      >
        {addingMsg}
      </Snackbar>
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
    paddingTop: 25,
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
  },
  searchInputContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});
export default AddWidgetScreen;
