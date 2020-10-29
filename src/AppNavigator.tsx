import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './pages/Home';
import {routes} from './pages/TabNavigator';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={routes[0].options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
