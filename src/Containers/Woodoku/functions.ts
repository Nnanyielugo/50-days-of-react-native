import { v4 as uuidV4 } from 'uuid';
import { BOARD_WIDTH } from './constants';
import type { RowObj } from './types';

function generateBrickNum() {
  let numBricks = Math.floor((Math.random() * 10) / 2);
  while (numBricks < 2) {
    numBricks = Math.floor((Math.random() * 10) / 2);
  }

  return numBricks;
}

function pickWidthForTwos() {
  const widths: RowObj[] = [
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.5,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.5,
          transparent: false,
        },
      ],
    },

    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.75,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.7,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.75,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.7,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.8,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.5,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.5,
          transparent: true,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.8,
          transparent: true,
        },
      ],
    },
  ];

  let brickNum = Math.floor(Math.random() * widths.length);
  return widths[brickNum];
}
function pickWidthForThrees() {
  const widths: RowObj[] = [
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.4,
          transparent: true,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.5,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.5,
          transparent: true,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.4,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.5,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.5,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.4,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.5,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.5,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
  ];

  let brickNum = Math.floor(Math.random() * widths.length);
  return widths[brickNum];
}
function pickWidthForFours() {
  const widths: RowObj[] = [
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.25,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.3,
          transparent: false,
        },
      ],
    },
    {
      id: uuidV4(),
      row: [
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: true,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.4,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
        {
          id: uuidV4(),
          width: BOARD_WIDTH * 0.2,
          transparent: false,
        },
      ],
    },
  ];
  let brickNum = Math.floor(Math.random() * widths.length);
  return widths[brickNum];
}

// function generateBrickWidth(width: number): any {
//   let brickWidth = Math.ceil(Math.random() * width);
//   const maxWidth = width / 2;
//   const minWidth = width / 3;

//   if (brickWidth > maxWidth) {
//     return generateBrickWidth(width);
//   }

//   if (brickWidth < minWidth) {
//     return generateBrickWidth(width);
//   }

//   return brickWidth;
// }

export function generateRow(): RowObj {
  let output: RowObj;
  // let actionableWidth = BOARD_WIDTH;
  let numBricks = generateBrickNum();
  // console.log('num bricks', numBricks);
  pickWidthForFours();

  if (numBricks === 2) {
    output = pickWidthForTwos();
  } else if (numBricks === 3) {
    output = pickWidthForThrees();
  } else {
    output = pickWidthForFours();
  }

  // for (let i = 1; i <= numBricks; i++) {
  //   if (i === numBricks) {
  //     output.push(actionableWidth);
  //   } else {
  //     let width = generateBrickWidth(actionableWidth);
  //     actionableWidth -= width;
  //     // console.log('width', width, actionableWidth);
  //     output.push(width);
  //   }
  // }

  return output;
}

export function generateRows(rowNum: number): RowObj[] {
  const rows: RowObj[] = [];

  for (let i = 0; i < rowNum; i++) {
    rows.push(generateRow());
  }

  return rows;
}
