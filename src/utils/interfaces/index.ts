import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  StopWatch: undefined;
  Weather: undefined;
  MusicPlayer: undefined;
  TinderSwipe: undefined;
  VideoPlayer: undefined;
};

export interface Page {
  name: string;
  componentName: keyof RootStackParamList;
  icon: string;
}

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;
