import { generateId } from './functions';
import { BOARD_WIDTH } from './constants';
import type { RowObj } from './types';

export function generateBoard1(): RowObj[] {
  return [
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
          width: BOARD_WIDTH * 0.4,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.6,
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
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
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
      ],
    },
  ];
}
export function generateBoard2(): RowObj[] {
  return [
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
          width: BOARD_WIDTH * 0.7,
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
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.4,
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
          width: BOARD_WIDTH * 0.6,
          transparent: true,
        },
      ],
    },
  ];
}
export function generateBoard3(): RowObj[] {
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
          width: BOARD_WIDTH * 0.5,
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
          width: BOARD_WIDTH * 0.5,
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
          width: BOARD_WIDTH * 0.2,
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
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
      ],
    },
  ];
}
export function generateBoard4(): RowObj[] {
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
          width: BOARD_WIDTH * 0.6,
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
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
      ],
    },
  ];
}
export function generateBoard5(): RowObj[] {
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
          width: BOARD_WIDTH * 0.4,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.6,
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
          width: BOARD_WIDTH * 0.7,
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
      ],
    },
  ];
}
export function generateBoard6(): RowObj[] {
  return [
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
          width: BOARD_WIDTH * 0.4,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.6,
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
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
      ],
    },
  ];
}
export function generateBoard7(): RowObj[] {
  return [
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
          width: BOARD_WIDTH * 0.2,
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
          transparent: false,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.2,
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
  ];
}
export function generateBoard8(): RowObj[] {
  return [
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
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.4,
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
          width: BOARD_WIDTH * 0.4,
          transparent: true,
        },
        {
          id: generateId(),
          width: BOARD_WIDTH * 0.6,
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
          transparent: true,
        },
      ],
    },
  ];
}

// export const board1: RowObj[] =

// export const board2: RowObj[] =

// export const board3: RowObj[] =

// export const board4: RowObj[] =

// export const board5: RowObj[] =

// export const board6: RowObj[] =

// export const board7: RowObj[] =

// export const board8: RowObj[] =
