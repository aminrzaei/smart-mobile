import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ActivityIndicator, Colors, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import smartApi from '../api/smartApi';
import Action from '../components/Action';
import ServerErrorSnackBar from '../components/ServerErrorSnackBar';

const WidgetsScreen = ({ navigation }) => {
  const [selectedWidget, setSelectedWidget] = useState('');
  const [userWidgets, setUserWidgets] = useState([]);
  const [showServerErrorMsg, setShowServerErrorMsg] = useState(false);

  useEffect(() => {
    getUserWidgets();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUpdatedUserWidgets();
    });
    return unsubscribe;
  }, [navigation, selectedWidget]);

  const getUpdatedUserWidgets = async () => {
    try {
      const result = await smartApi.get('/user/widget');
      setUserWidgets(result.data.userWidgets);
      if (selectedWidget === '' && !!result.data.userWidgets.length) {
        setSelectedWidget(result.data.userWidgets[0].name);
      }
    } catch (err) {
      setShowServerErrorMsg(true);
      console.log(err);
    }
  };

  const getUserWidgets = async () => {
    try {
      const result = await smartApi.get('/user/widget');
      const userWidgetsResult = result.data.userWidgets;
      setUserWidgets(userWidgetsResult);
      if (!!userWidgetsResult.length) {
        setSelectedWidget(userWidgetsResult[0].name);
      }
    } catch (err) {
      setShowServerErrorMsg(true);
      console.log(err);
    }
  };

  const RenderTopTab = ({ item }) => {
    const { name } = item;
    const selected = selectedWidget === name;
    return (
      <TouchableOpacity onPress={() => setSelectedWidget(name)}>
        <View style={styles.topTab}>
          <Text
            style={selected ? styles.selectedTopTabTitle : styles.topTabtitle}
          >
            {name}
          </Text>
          {selected ? <View style={styles.topTabBoderBottom}></View> : null}
        </View>
      </TouchableOpacity>
    );
  };

  const RenderActionsContainer = () => {
    const widget = userWidgets.find((el) => el.name === selectedWidget);
    if (widget) {
      return (
        <View style={styles.actionsContainer}>
          <RenderActions widget={widget} />
          <View style={styles.widgetIcon}>
            <AntDesign name={widget.icon} size={90} color="#BFBFBF"></AntDesign>
          </View>
        </View>
      );
    }
    return (
      <ActivityIndicator
        size={50}
        style={{ flex: 1 }}
        animating={true}
        color={Colors.black}
      />
    );
  };

  const RenderActions = ({ widget }) => {
    return widget.actions.map((action) => (
      <Action
        key={action.name}
        action={action}
        onPress={() =>
          navigation.navigate(action.type, {
            name: action.name,
            payload: action.payload,
            state: action.state,
          })
        }
      />
    ));
  };

  const RenderPage = () => {
    if (!!userWidgets.length) {
      return (
        <>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={styles.flatList}
            horizontal={true}
            data={userWidgets}
            renderItem={RenderTopTab}
            keyExtractor={(item) => item.name}
          />
          <RenderActionsContainer />
        </>
      );
    }
    return (
      <View style={styles.goToAddWidget}>
        <Button
          uppercase={false}
          color="black"
          mode="outlined"
          onPress={() => navigation.navigate('AddWidgets')}
        >
          <>
            <AntDesign name="plus" size={24} color="black" />
            <View style={{ width: 20 }}></View>
            <Text style={styles.goToAddWidgetTitle}>Add Some Widget</Text>
          </>
        </Button>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <RenderPage />
      <ServerErrorSnackBar
        visible={showServerErrorMsg}
        onDismiss={() => setShowServerErrorMsg(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    paddingTop: 15,
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
  },
  flatList: {
    backgroundColor: 'transparent',
    maxHeight: 40,
  },
  topTab: {
    padding: 5,
    marginVertical: 2,
    marginLeft: 15,
    marginRight: 5,
  },
  topTabtitle: {
    color: '#A9A9A9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedTopTabTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topTabBoderBottom: {
    height: 3,
    marginTop: 2,
    width: 40,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  actionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  widgetIcon: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: 35,
  },
  goToAddWidget: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goToAddWidgetTitle: {
    fontSize: 20,
  },
});
export default WidgetsScreen;
