import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';
export * from './weather';
export * from './music-player';

export type RootStackParamList = {
  Home: any;
  StopWatch: any;
  Weather: any;
  MusicPlayer: any;
};

export interface Page {
  name: string;
  componentName: keyof RootStackParamList;
}

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;
