import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Containers/Home';
import StopWatch from '../Containers/StopWatch';
import Weather from '../Containers/Weather';
import MusicPlayer from '../Containers/MusicPlayer';
import TinderSwipe from '../Containers/TinderSwipe';
import VideoPlayer from '../Containers/VideoPlayer';
import TickTacToe from '../Containers/TicTacToe';

import type { RootStackParamList } from '../utils/interfaces';

export default function Navigator() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StopWatch" component={StopWatch} />
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
        <Stack.Screen name="TinderSwipe" component={TinderSwipe} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        <Stack.Screen name="TicTacToe" component={TickTacToe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
