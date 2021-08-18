import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SWIPE_AUTO_HEIGHT = -(SCREEN_HEIGHT * 0.8);
export const SWIPE_THRESHOLD = -(SCREEN_HEIGHT * 0.4);
