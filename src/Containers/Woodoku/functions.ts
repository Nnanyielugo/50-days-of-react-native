import { BOARD_WIDTH, getBoards } from './constants';
import type { RowObj, BrickObj } from './types';

export function generateId(): string {
  let id =
    (Math.random() * new Date().getTime()).toString() +
    '-' +
    (Math.random() * 1e4).toString();
  return id;
}

function generateBrickNum() {
  let numBricks = Math.floor((Math.random() * 10) / 2);
  while (numBricks < 2) {
    numBricks = Math.floor((Math.random() * 10) / 2);
  }

  return numBricks;
}

// function pickWidthForTwos() {
//   const widths = getWidthsForTwos();

//   let brickNum = Math.floor(Math.random() * widths.length);
//   return widths[brickNum];
// }
// function pickWidthForThrees() {
//   const widths = getWidthsForThrees();

//   let brickNum = Math.floor(Math.random() * widths.length);
//   return widths[brickNum];
// }
// function pickWidthForFours() {
//   const widths = getWidthsForFours();
//   let brickNum = Math.floor(Math.random() * widths.length);
//   return widths[brickNum];
// }

// export function generateRow(): RowObj {
//   let output: RowObj;
//   let numBricks = generateBrickNum();
//   pickWidthForFours();

//   if (numBricks === 2) {
//     output = pickWidthForTwos();
//   } else if (numBricks === 3) {
//     output = pickWidthForThrees();
//   } else {
//     output = pickWidthForFours();
//   }

//   return output;
// }

export function generateRows(): RowObj[] {
  // const boards = getBoards()
  let board = [];
  let boardNum = Math.floor(Math.random() * 8);
  console.log('ranndo', boardNum);

  board = getBoards(boardNum);
  // let board = boards[boardNum];

  for (let i = 0; i < board.length; i++) {
    const row = board[i];

    for (let j = 0; j < row.row.length; j++) {
      const brick = row.row[j];
      const pos = getBrickPosition(brick, row);
      board[i].row[j].pos = pos;
    }
  }

  for (let i = 0; i < board.length; i++) {
    let row = board[i];
    let visibleRow = row.row.filter(brick => !brick.transparent);
    board.splice(i, 1, {
      id: row.id,
      row: visibleRow,
    });
  }

  console.log('board', board, boardNum);

  return board;
}

function rearrangeRowSpacing(row: RowObj): RowObj {
  const emptyRow = row.row.find(
    (item, index) =>
      (item.transparent && item.width >= BOARD_WIDTH / 2) ||
      (item.transparent && (index === 0 || index === row.row.length - 1)),
  );

  if (emptyRow) {
    const duplicateRow: RowObj = {
      id: row.id,
      row: row.row.filter(item => !item.transparent),
    };

    duplicateRow.row.unshift({
      id: generateId(),
      width: emptyRow.width / 2,
      transparent: true,
    });

    duplicateRow.row.push({
      id: generateId(),
      width: emptyRow.width / 2,
      transparent: true,
    });

    return duplicateRow;
  }

  return row;
}

function handleDropDown(
  brick: BrickObj,
  row: RowObj,
  rowIndex: number,
  rows: RowObj[],
) {
  // if (rowIndex === rows)
}

// returns information about the space and item to drop into (the under item)
export function canDropDown(
  target: BrickObj,
  currentRow: RowObj,
  rowUnder: RowObj,
) {
  const targetBrickPosition = getBrickPosition(target, currentRow);
  // console.log('target pos', targetBrickPosition, currentRow, rowUnder);
  for (let i = 0; i < rowUnder.row.length; i++) {
    let brick = rowUnder.row[i];
    let brickPosition = getBrickPosition(brick, rowUnder);
    const underLapping =
      targetBrickPosition.left >= brickPosition.left &&
      targetBrickPosition.right <= brickPosition.right;

    if (underLapping && brick.transparent) {
      // console.log('------------UNDER_LAPPING------------');
      // console.log(targetBrickPosition, target, brickPosition, brick);
      // console.log();
      return {
        pos: brickPosition,
        index: i,
        brick: brick,
      };
    }
  }

  return;
}

export function getBrickPosition(target: BrickObj, currentRow: RowObj) {
  const brickIndex = currentRow.row.findIndex(
    rowItem => rowItem.id === target.id,
  );
  let left: number = 0;
  let right: number = 0;
  let accRight = 0;
  if (brickIndex === 0) {
    left = 0;
  } else {
    for (let i = 0; i < currentRow.row.length; i++) {
      if (i === brickIndex) {
        break;
      }

      left += currentRow.row[i].width;
    }
  }

  if (brickIndex === currentRow.row.length - 1) {
    right = BOARD_WIDTH;
  } else {
    for (let i = currentRow.row.length - 1; i > 0; i--) {
      if (i === brickIndex) {
        break;
      }

      accRight += currentRow.row[i].width;
      right = BOARD_WIDTH - accRight;
    }
  }

  return { left, right };
}
