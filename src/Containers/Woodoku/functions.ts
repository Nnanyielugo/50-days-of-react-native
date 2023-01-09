import { BOARD_WIDTH, getBoards } from './constants';
import type { RowObj, BrickObj, BrickPos } from './types';

export function generateId(): string {
  let id =
    (Math.random() * new Date().getTime()).toString() +
    '-' +
    (Math.random() * 1e4).toString();
  return id;
}

export function generateBoard(): RowObj[] {
  let board = [];
  let boardNum = Math.floor(Math.random() * 8);

  board = getBoards(boardNum);

  for (let i = 0; i < board.length; i++) {
    const row = board[i];

    for (let j = 0; j < row.row.length; j++) {
      const brick = row.row[j];
      const pos = getBrickPosition(brick, row);
      board[i].row[j].pos = pos;
    }
  }

  // remove empty bricks
  for (let i = 0; i < board.length; i++) {
    let row = board[i];
    let visibleRow = row.row.filter(brick => !brick.transparent);
    board.splice(i, 1, {
      id: row.id,
      row: visibleRow,
    });
  }

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

// returns information about the space and item to drop into (the under item)
export function canDropDown(target: BrickObj, rowUnder: RowObj) {
  let targetPos = target.pos as BrickPos;
  // console.log('target pos', targetBrickPosition, currentRow, rowUnder);
  for (let i = 0; i < rowUnder.row.length; i++) {
    let brick = rowUnder.row[i];
    let brickPos = brick.pos as BrickPos;

    const isWithinRange =
      brickPos.right > targetPos.left || brickPos.left < targetPos.right;
    console.log('within range', isWithinRange);
    // const underLapping =
    //   (target.pos as BrickPos).left >= (brick.pos as BrickPos).left &&
    //   (target.pos as BrickPos).right <= (brick.pos as BrickPos).right;

    // if (underLapping && brick.transparent) {
    // console.log('------------UNDER_LAPPING------------');
    // console.log(targetBrickPosition, target, brickPosition, brick);
    // console.log();
    // return {
    //   pos: brickPosition,
    //   index: i,
    //   brick: brick,
    // };
    // }
  }

  return;
}

export function getBrickPosition(target: BrickObj, currentRow: RowObj) {
  const brickIndex = currentRow.row.findIndex(
    rowItem => rowItem.id === target.id,
  );
  let left: number = 0;
  let right: number = 0;
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
    right = left + target.width;
  }

  return { left, right };
}
