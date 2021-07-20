import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Containers/Home';
import StopWatch from '../Containers/StopWatch';

export default function Navigator() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StopWatch" component={StopWatch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
