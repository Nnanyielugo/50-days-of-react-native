import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

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

export interface Coords {
  longitude: number;
  latitude: number;
}

export interface Address {
  locality: string;
}

export interface Current {
  date: number;
  temp: number;
  feels_like: number;
  sunset: number;
  sunrise: number;
  desc: string;
  icon: string;
}

export interface Hourly {
  date: number;
  temp: number;
  pop: number; // prob of rain
  desc: string;
  icon: string;
}

export interface Daily {
  date: number;
  day: number;
  night: number;
  desc: string;
  pop: number;
  icon: string;
}
