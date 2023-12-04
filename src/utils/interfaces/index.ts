import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

export type RootStackParamList = {
  Home: undefined;
  StopWatch: undefined;
  Weather: undefined;
  MusicPlayer: undefined;
  TinderSwipe: undefined;
  VideoPlayer: undefined;
  TicTacToe: undefined;
  ImageCarousel: undefined;
  Reels: undefined;
  Calculator: undefined;
  NearbyPlaces: undefined;
  Woodoku: undefined;
};

type AllowedMenuPages = Omit<RootStackParamList, 'Home'>;

export interface Page {
  name: string;
  componentName: keyof AllowedMenuPages;
  Icon: FC<SvgProps>;
}

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;
