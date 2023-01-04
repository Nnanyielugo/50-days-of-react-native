import { Dimensions } from 'react-native';

import { generateId } from './functions';

import type { RowObj } from './types';

export const BOARD_WIDTH = Dimensions.get('window').width * 0.9;
export const BOARD_HEIGHT = Dimensions.get('window').height * 0.6;

export function getWidthsForTwos(): RowObj[] {
  return [
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.5,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.5,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.75,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.7,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.75,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.7,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.8,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.5,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.5,
          transparent: true,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.8,
          transparent: true,
        },
      ],
    },
  ];
}

export function getWidthsForThrees(): RowObj[] {
  return [
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.4,
          transparent: true,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.5,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.5,
          transparent: true,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.4,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.5,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.5,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.4,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.5,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.5,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
  ];
}

export function getWidthsForFours(): RowObj[] {
  return [
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: generateId(),
      row: [
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
      ],
    },
  ];
}
