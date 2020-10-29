/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Button,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Table} from '../components/Table';
import {stores} from '../stores/Stores';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.welcome}>
      <Text>{'Приложение для просмотра котировок в Poloniex'}</Text>
      <View style={{marginTop: 24}}>
        <Button
          title={'Котировки'}
          onPress={() => {
            navigation.navigate(routes[1].id);
          }}
        />
      </View>
    </View>
  );
};

const Quotes = () => <Table />;

const startPoll = (name: string) => {
  stores.poloniex.poll(name).then().catch();
};

export const routes = [
  {
    id: 'Welcome',
    options: {
      title: 'О приложении',
      headerTitleStyle: {alignSelf: 'center'},
    },
    component: Welcome,
  },
  {
    id: 'Quotes',
    options: {
      title: 'Котировки',
      headerTitleStyle: {alignSelf: 'center'},
    },
    component: Quotes,
  },
];

const prepareOptions = (route: string, options: any, navigation: any): any => {
  const leftButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(routes[0].id);
        }}>
        <Text style={{paddingLeft: 16, fontSize: 20}}>{'<'}</Text>
      </TouchableOpacity>
    );
  };

  return {
    ...options,
    headerTitle: options.title,
    headerLeft: route === routes[1].id ? leftButton : undefined,
  };
};

function TabBar({state, descriptors, navigation}: any) {
  useFocusEffect(
    React.useCallback(() => {
      const r = state.routes[state.index];
      navigation.setOptions(
        prepareOptions(r.name, routes[state.index].options, navigation),
      );
      startPoll(r.name);
    }, [state, navigation]),
  );

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabbar}>
            <Text
              style={[styles.labelBar, {color: isFocused ? 'blue' : '#222'}]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props: any) => <TabBar {...props} />}>
      {routes.map((route: any) => (
        <Tab.Screen
          key={route.id}
          name={route.id}
          component={route.component}
          options={route.options}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
  } as ViewStyle,
  tabbar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  } as ViewStyle,
  labelBar: {
    fontSize: 16,
    fontWeight: '600',
  } as TextStyle,
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
};
