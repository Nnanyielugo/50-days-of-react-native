import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  StopWatch: undefined;
  Weather: undefined;
  MusicPlayer: undefined;
  TinderSwipe: undefined;
  VideoPlayer: undefined;
  TicTacToe: undefined;
  ImageCarousel: undefined;
};

type AllowedMenuPages = Omit<RootStackParamList, 'Home'>;

export interface Page {
  name: string;
  componentName: keyof AllowedMenuPages;
  icon: string;
}

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;
