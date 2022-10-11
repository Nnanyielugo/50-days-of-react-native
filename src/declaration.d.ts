declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module 'react-native-slider';
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
