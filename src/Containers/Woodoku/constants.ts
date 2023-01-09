import { Dimensions } from 'react-native';

import type { RowObj } from './types';

import {
  generateBoard1,
  generateBoard2,
  generateBoard3,
  generateBoard4,
  generateBoard5,
  generateBoard6,
  generateBoard7,
  generateBoard8,
} from './boards';

export const BOARD_WIDTH = Dimensions.get('window').width * 0.9;
export const BOARD_HEIGHT = Dimensions.get('window').height * 0.6;

export function getBoards(randomNum: number): RowObj[] {
  switch (randomNum) {
    case 0:
      return generateBoard1();
    case 1:
      return generateBoard2();
    case 2:
      return generateBoard3();
    case 3:
      return generateBoard4();
    case 4:
      return generateBoard5();
    case 5:
      return generateBoard6();
    case 6:
      return generateBoard7();
    case 7:
      return generateBoard8();
    default:
      return [];
  }
}
