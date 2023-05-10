import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';
import { Button, ActivityIndicator, Colors } from 'react-native-paper';

const Widget = ({ widget, indicatorIndex, btnFunc }) => {
  const RenderWidgetButton = () => {
    if (indicatorIndex === widget._id) {
      return (
        <ActivityIndicator
          style={styles.indicator}
          animating={true}
          color={Colors.blue400}
        />
      );
    } else {
      return (
        <Button
          onPress={() => btnFunc(widget._id)}
          color="#0066FF"
          uppercase={false}
          labelStyle={{ fontSize: 18 }}
        >
          Add
        </Button>
      );
    }
  };

  return (
    <View style={styles.widgetContainer}>
      <View style={styles.widgetDetails}>
        <AntDesign name={widget.icon} size={24} />
        <Text style={styles.widgetTitle}>{widget.name}</Text>
      </View>
      <RenderWidgetButton />
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 20,
    paddingVertical: 9,
    paddingRight: 10,
    paddingLeft: 18,
    borderRadius: 5,
  },
  widgetDetails: { flexDirection: 'row', alignItems: 'center' },
  widgetTitle: { marginLeft: 10, fontSize: 17, fontWeight: 'bold' },
  indicator: { marginTop: 8, marginBottom: 10, marginRight: 25 },
});
export default Widget;
