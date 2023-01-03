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
import ImageCarousel from '../Containers/ImageCarousel';
import Reels from '../Containers/Reels';
import Calculator from '../Containers/Calculator';
import NearbyPlaces from '../Containers/NearbyPlaces';
import Woodoku from '../Containers/Woodoku';

import type { RootStackParamList } from '../utils/interfaces';

export default function Navigator() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StopWatch" component={StopWatch} />
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
        <Stack.Screen name="TinderSwipe" component={TinderSwipe} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        <Stack.Screen name="TicTacToe" component={TickTacToe} />
        <Stack.Screen name="ImageCarousel" component={ImageCarousel} />
        <Stack.Screen name="Reels" component={Reels} />
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="NearbyPlaces" component={NearbyPlaces} />
        <Stack.Screen name="Woodoku" component={Woodoku} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
